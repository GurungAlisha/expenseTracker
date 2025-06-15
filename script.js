// ─── DOM ELEMENTS ───────────────────────────────────────────────────────────
const form        = document.getElementById("form");
const textInput   = document.getElementById("text");
const amountInput = document.getElementById("amount");
const typeInput   = document.getElementById("type");
const list        = document.getElementById("list");
const balanceEl   = document.getElementById("balance");
const incomeEl    = document.getElementById("money-plus");
const expenseEl   = document.getElementById("money-minus");
const filterSel   = document.getElementById("filter");
const saveBtn     = document.getElementById("save-btn");

// ─── STATE ───────────────────────────────────────────────────────────────────
let transactions = [];

// ─── LOAD & HEAL MALFORMED STORAGE ──────────────────────────────────────────
window.addEventListener("DOMContentLoaded", () => {
  const raw = localStorage.getItem("transactions");
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (
        Array.isArray(parsed) &&
        parsed.every(
          tx =>
            tx &&
            typeof tx === "object" &&
            typeof tx.text === "string" &&
            typeof tx.amount === "number" &&
            typeof tx.id === "number"
        )
      ) {
        transactions = parsed;
      } else {
        console.warn("Malformed data in localStorage, clearing it.");
        localStorage.removeItem("transactions");
      }
    } catch {
      localStorage.removeItem("transactions");
    }
  }
  renderAll();
});

// ─── ADD TRANSACTION ─────────────────────────────────────────────────────────
form.addEventListener("submit", e => {
  e.preventDefault();
  const text = textInput.value.trim();
  let amount  = parseFloat(amountInput.value);
  if (!text || isNaN(amount)) {
    return alert("Please enter a valid description and amount.");
  }
  if (typeInput.value === "expense") amount = -Math.abs(amount);

  transactions.push({ id: Date.now(), text, amount });
  renderAll();
  form.reset();
});

// ─── SAVE TO localStorage ───────────────────────────────────────────────────
saveBtn.addEventListener("click", () => {
  localStorage.setItem("transactions", JSON.stringify(transactions));
  alert("✅ Transactions saved!");
});

// ─── DELETE TRANSACTION ──────────────────────────────────────────────────────
function deleteTransaction(id) {
  transactions = transactions.filter(tx => tx.id !== id);
  renderAll();
}

// ─── FILTER CHANGE ───────────────────────────────────────────────────────────
filterSel.addEventListener("change", applyFilter);

// ─── RENDER ALL ──────────────────────────────────────────────────────────────
function renderAll() {
  list.innerHTML = "";
  transactions.forEach(renderOne);
  updateTotals();
  applyFilter();
}

// ─── RENDER ONE ──────────────────────────────────────────────────────────────
function renderOne(tx) {
  const li = document.createElement("li");
  li.className = tx.amount > 0 ? "plus" : "minus";
  li.innerHTML = `
    ${tx.text}: $${tx.amount.toFixed(2)}
    <button class="delete-btn" onclick="deleteTransaction(${tx.id})">×</button>
  `;
  list.appendChild(li);
}

// ─── UPDATE SUMMARY ──────────────────────────────────────────────────────────
function updateTotals() {
  const amounts = transactions.map(tx => tx.amount);
  const income  = amounts.filter(n => n > 0).reduce((a,b)=>a+b, 0);
  const expense = amounts.filter(n => n < 0).reduce((a,b)=>a+b, 0);
  incomeEl.innerText  = `+$${income.toFixed(2)}`;
  expenseEl.innerText = `-$${Math.abs(expense).toFixed(2)}`;
  balanceEl.innerText = `$${(income + expense).toFixed(2)}`;
}

// ─── APPLY FILTER ────────────────────────────────────────────────────────────
function applyFilter() {
  const mode = filterSel.value;
  Array.from(list.children).forEach((li, i) => {
    if (mode === "all") {
      li.style.display = "flex";
    } else if (mode === "income") {
      li.style.display = transactions[i].amount > 0 ? "flex" : "none";
    } else {
      li.style.display = transactions[i].amount < 0 ? "flex" : "none";
    }
  });
}
