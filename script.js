document.getElementById("form").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Transaction added!");
});
const list = document.getElementById("list");
...
const li = document.createElement("li");
li.innerText = `${text}: $${amount}`;
list.appendChild(li);