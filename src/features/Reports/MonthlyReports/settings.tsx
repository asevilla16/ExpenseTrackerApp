import React from "react";

export const data = (data, transaction) => {
  return {
    labels: data.map((item) => item.categoryId),
    datasets: [
      {
        label: transaction,
        data: data.map((item) => item.total),
        backgroundColor: [
          "rgba(255, 159, 64, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgb(255, 159, 64)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
        ],
        borderWidth: 2,
      },
    ],
  };
};

export const balanceDataset = (incomesTotal, expensesTotal) => {
  return {
    labels: ["Incomes", "Expenses"],
    datasets: [
      {
        label: "Balance",
        data: [incomesTotal, expensesTotal],
        backgroundColor: [
          "rgba(255, 159, 64, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgb(255, 159, 64)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
        ],
        borderWidth: 2,
      },
    ],
  };
};

export const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};
