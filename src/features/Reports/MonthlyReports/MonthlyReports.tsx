import React, { useEffect, useState } from "react";
import { Chart } from "primereact/chart";
import "./style.css";
import {
  getTotalExpensesByCategory,
  getTotalIncomesByCategory,
} from "../../../api/Api";
import { balanceDataset, data, options } from "./settings";

const MonthlyReports = () => {
  const [incomesChartData, setIncomesChartData] = useState({});
  const [incomesChartOptions, setIncomesChartOptions] = useState({});
  const [expensesChartData, setExpensesChartData] = useState({});
  const [expensesChartOptions, setExpensesChartOptions] = useState({});
  const [balanceChartData, setBalanceChartData] = useState({});
  const [balanceChartOptions, setBalanceChartOptions] = useState({});

  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const [totalIncomes, setTotalIncomes] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    getReportsInfo();
  }, []);

  useEffect(() => {
    calculateTotalAmounts();
    const exportedIncomesData = data(incomes, "Incomes");
    const exportedExpensesData = data(expenses, "Expenses");

    setIncomesChartData(exportedIncomesData);
    setIncomesChartOptions(options);

    setExpensesChartData(exportedExpensesData);
    setExpensesChartOptions(options);

    setBalanceChartOptions(options);
  }, [incomes, expenses]);

  const calculateTotalAmounts = () => {
    let incomesTotal = incomes.reduce((prev: any, curr: any) => {
      return prev + curr.total;
    }, 0);
    let expensesTotal = expenses.reduce((prev: any, curr: any) => {
      return prev + curr.total;
    }, 0);

    const balanceData = balanceDataset(incomesTotal, expensesTotal);
    setBalanceChartData(balanceData);
  };

  const getReportsInfo = () => {
    getTotalIncomesByCategory().then((res: any) => {
      if (res) {
        console.log(res);
        buildReportsInfo(res);
      }
    });

    getTotalExpensesByCategory().then((res) => {
      if (res) {
        buildReportsExpensesInfo(res);
      }
    });
  };

  const buildReportsInfo = (incomes) => {
    let groupedIncomes = incomes.map((item) => {
      return {
        categoryId: item._id,
        total: item.total,
      };
    });

    setIncomes(groupedIncomes);
  };

  const buildReportsExpensesInfo = (expenses) => {
    let groupedExpenses = expenses.map((item) => {
      return {
        categoryId: item._id,
        total: item.total,
      };
    });

    setExpenses(groupedExpenses);
  };

  return (
    <>
      <div className="reports-container">
        <div className="bar-chart">
          <h3>Balance</h3>
          <Chart
            type="bar"
            data={balanceChartData}
            options={balanceChartOptions}
          />
        </div>
      </div>
      <div className="pie-charts-container">
        <div className="chart">
          <h3>Incomes Report</h3>
          <Chart
            type="pie"
            data={incomesChartData}
            options={incomesChartOptions}
          />
        </div>
        <div className="chart">
          <h3>Expenses Report</h3>
          <Chart
            type="pie"
            data={expensesChartData}
            options={expensesChartOptions}
          />
        </div>
      </div>
    </>
  );
};

export default MonthlyReports;
