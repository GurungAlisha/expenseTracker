const form = document.getElementById("form");
const textInput = document.getElementById("text");
const amountInput = document.getElementById("amount");
const list = document.getElementById("list");
const total = document.getElementById("balance");
const income = document.getElementById("money-plus");
const expense = document.getElementById("money-minus");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const text = textInput.value.trim();
  const amount = +amountInput.value;

  if (text === "" || isNaN(amount)) {
    alert("Please enter valid text and amount");
    return;
  }

  addTransaction(text, amount);
  updateTotals();
  saveTransactions();

  textInput.value = "";
  amountInput.value = "";
});

function addTransaction(text, amount) {
  const li = document.createElement("li");
  li.innerHTML = `${text}: $${amount} <button class="delete-btn">x</button>`;
  li.classList.add(amount > 0 ? "plus" : "minus");

  li.querySelector(".delete-btn").addEventListener("click", function () {
    li.remove();
    updateTotals();
    saveTransactions();
  });

  list.appendChild(li);
}

function updateTotals() {
  const amounts = Array.from(list.querySelectorAll("li"))
    .map(li => {
      const match = li.innerText.match(/\$(-?\d+(\.\d+)?)/);
      return match ? parseFloat(match[1]) : 0;
    });

  const incomeTotal = amounts.filter(n => n > 0).reduce((a, b) => a + b, 0);
  const expenseTotal = amounts.filter(n => n < 0).reduce((a, b) => a + b, 0);

  income.innerText = `+$${incomeTotal.toFixed(2)}`;
  expense.innerText = `-$${Math.abs(expenseTotal).toFixed(2)}`;
  total.innerText = `$${(incomeTotal + expenseTotal).toFixed(2)}`;
}

function saveTransactions() {
  const transactions = Array.from(list.querySelectorAll("li")).map(li => li.innerHTML);
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

window.addEventListener("DOMContentLoaded", () => {
  const saved = JSON.parse(localStorage.getItem("transactions")) || [];
  saved.forEach(html => {
    const li = document.createElement("li");
    li.innerHTML = html;

    const amount = parseFloat(html.split("$")[1]);
    li.classList.add(amount > 0 ? "plus" : "minus");

    li.querySelector(".delete-btn").addEventListener("click", function () {
      li.remove();
      updateTotals();
      saveTransactions();
    });

    list.appendChild(li);
  });

  updateTotals();
});

document.getElementById("filter").addEventListener("change", function () {
  const value = this.value;
  document.querySelectorAll("#list li").forEach(li => {
    if (value === "all") {
      li.style.display = "block";
    } else if (value === "income") {
      li.style.display = li.classList.contains("plus") ? "block" : "none";
    } else {
      li.style.display = li.classList.contains("minus") ? "block" : "none";
    }
  });
});



function drawChart() {
  const ctx = document.getElementById("expenseChart");
  if (!ctx) return;

  const amounts = Array.from(document.querySelectorAll("li"))
    .map(li => parseFloat(li.innerText.split("$")[1]))
    .filter(n => !isNaN(n));

  const incomeTotal = amounts.filter(n => n > 0).reduce((a, b) => a + b, 0);
  const expenseTotal = amounts.filter(n => n < 0).reduce((a, b) => a + b, 0);

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Income", "Expense"],
      datasets: [{
        label: "Amount",
        data: [incomeTotal, Math.abs(expenseTotal)],
        backgroundColor: ["#2ecc71", "#e74c3c"]
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

window.addEventListener("DOMContentLoaded", drawChart);
