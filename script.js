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
