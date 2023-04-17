import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { getExpenses, getIncomes } from "./ExpensesSlice";
import { IExpenseState, IExpensesState } from "./interface";
import { getAllExpenses, getAllIncomes } from "../../api/Api";
import TableComponent from "../../components/TableComponent/TableComponent";
import "./style.css";
import IndicatorComponent from "../../components/IndicatorComponent/IndicatorComponent";
import { useNavigate } from "react-router-dom";
import { expensesColumns, incomesColumns } from "../../utils/utils";

const Expenses = () => {
  const state = useSelector((state: IExpensesState) => state.expenses);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [incomesAmount, setIncomesAmount] = useState(0);
  const [expensesAmount, setExpensesAmount] = useState(0);

  useEffect(() => {
    handleGetExpenses();
    handleGetIncomes();
  }, []);

  const handleGetExpenses = () => {
    getAllExpenses().then((res) => {
      let exp = res.map((expense: any) => {
        return {
          id: expense._id,
          name: expense.name,
          category: expense.categoryId,
          amount: expense.amount,
          date: expense.date,
        };
      });
      setExpenses([...exp]);
      let expensesTotal = res.reduce((prev: any, curr: any) => {
        return prev + curr.amount;
      }, 0);
      setExpensesAmount(expensesTotal);
    });
  };

  const handleGetIncomes = () => {
    getAllIncomes().then((res) => {
      let incomesList = res.map((income: any) => {
        return {
          id: income._id,
          name: income.name,
          category: income.categoryId,
          amount: income.amount,
          date: income.date,
        };
      });
      setIncomes(incomesList);
      let incomesTotal = res.reduce((prev: any, curr: any) => {
        return prev + curr.amount;
      }, 0);
      setIncomesAmount(incomesTotal);
      console.log(incomesTotal);
    });
  };

  const handleNewTransaction = () => {
    navigate("/add-transaction");
  };

  return (
    <>
      <Button
        label="Add new Transaction"
        className=""
        onClick={handleNewTransaction}
        icon="pi pi-plus"
      />
      <div className="container align-items-center flex flex-column">
        <div className="indicators flex flex-row">
          <IndicatorComponent
            incomesValue={incomesAmount}
            expensesValue={expensesAmount}
          />
        </div>

        <div className="tables flex flex-row">
          <div className="incomes">
            <TableComponent
              data={incomes}
              transaction="Incomes"
              columns={incomesColumns}
            />
          </div>
          <div className="expenses">
            <TableComponent
              data={expenses}
              transaction="Expenses"
              columns={expensesColumns}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Expenses;
