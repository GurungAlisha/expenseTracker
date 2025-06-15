// chart.js

let chartInstance;

window.addEventListener("DOMContentLoaded", () => {
  const saved = JSON.parse(localStorage.getItem("transactions")) || [];

  // extract numbers from each saved li-HTML
  const amounts = saved
    .map(html => {
      const m = html.match(/\$(-?\d+(\.\d+)?)/);
      return m ? parseFloat(m[1]) : 0;
    });

  const incomeTotal  = amounts.filter(n => n > 0).reduce((a,b)=>a+b,0);
  const expenseTotal = Math.abs(amounts.filter(n => n < 0).reduce((a,b)=>a+b,0));

  // destroy old chart if exists
  if (chartInstance) chartInstance.destroy();

  const ctx = document.getElementById("expenseChart").getContext("2d");
  chartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Income", "Expense"],
      datasets: [{
        label: "Amount",
        data: [incomeTotal, expenseTotal],
        backgroundColor: ["#2ecc71", "#e74c3c"]
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
});
