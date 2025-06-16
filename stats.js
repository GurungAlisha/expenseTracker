document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("expenseChart").getContext("2d");
  const raw = localStorage.getItem("transactions");

  if (!raw) {
    alert("No data found. Add some transactions first!");
    return;
  }

  try {
    const transactions = JSON.parse(raw);

    // Validate format
    if (!Array.isArray(transactions) || transactions.some(tx => typeof tx.amount !== "number")) {
      throw new Error("Invalid transaction data.");
    }

    const income = transactions
      .filter(tx => tx.amount > 0)
      .reduce((sum, tx) => sum + tx.amount, 0);

    const expense = transactions
      .filter(tx => tx.amount < 0)
      .reduce((sum, tx) => sum + tx.amount, 0);

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Income", "Expense"],
        datasets: [{
          label: "Amount",
          data: [income, Math.abs(expense)],
          backgroundColor: ["#a2f3bd", "#fba8a8"],
          borderRadius: 10
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: ctx => `$${ctx.raw.toFixed(2)}`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: val => `$${val}`
            }
          }
        }
      }
    });

  } catch (err) {
    console.error("Chart rendering failed:", err);
    alert("Failed to load chart. Try resetting transactions.");
  }
});
