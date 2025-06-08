document.getElementById("form").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Transaction added!");
});
const list = document.getElementById("list");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const text = document.getElementById("text").value;
  const amount = +document.getElementById("amount").value;
  const li = document.createElement("li");
  li.innerText = `${text}: $${amount}`;
  list.appendChild(li);
});
li.innerHTML = `${text}: $${amount} <button class="delete-btn">x</button>`;
li.querySelector(".delete-btn").addEventListener("click", function () {
  li.remove();
});

const total = document.getElementById("balance");
const income = document.getElementById("money-plus");
const expense = document.getElementById("money-minus");

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

// Call this in form submit
updateTotals();

text.value = "";
amount.value = "";