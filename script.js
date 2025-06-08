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