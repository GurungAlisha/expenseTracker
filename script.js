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
  let amounts = Array.from(document.querySelectorAll("li"))
    .map(li => parseFloat(li.innerText.split("$")[1]))
    .filter(n => !isNaN(n));

  let incomeTotal = amounts.filter(n => n > 0).reduce((a, b) => a + b, 0);
  let expenseTotal = amounts.filter(n => n < 0).reduce((a, b) => a + b, 0);

  income.innerText = `+$${incomeTotal}`;
  expense.innerText = `-$${Math.abs(expenseTotal)}`;
  total.innerText = `$${incomeTotal + expenseTotal}`;
}

function saveTransactions() {
  const transactions = Array.from(document.querySelectorAll("li")).map(li => li.innerHTML);
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Load saved transactions
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

li.classList.add(amount > 0 ? "plus" : "minus");

function saveTransactions() {
  const transactions = Array.from(document.querySelectorAll("li")).map(li => li.innerText);
  localStorage.setItem("transactions", JSON.stringify(transactions));
}
// Call after list update
saveTransactions();
