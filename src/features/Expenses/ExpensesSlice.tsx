import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IExpenseState, IExpensesState, IIncomeState } from "./interface";

const getCurrentDateString = () => new Date(Date.now()).toISOString();
const initialState: IExpensesState = {
  expenses: [
    {
      id: 0,
      name: "",
      categoryId: 0,
      amount: 0,
      date: getCurrentDateString(),
    },
  ],
  incomes: [
    {
      id: 0,
      name: "",
      categoryId: 0,
      amount: 0,
      date: getCurrentDateString(),
    },
  ],
};

export const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    getExpenses: (state, action: PayloadAction<IExpenseState[]>) => {
      state.expenses = action.payload;
    },
    getIncomes: (state, action: PayloadAction<IIncomeState[]>) => {
      state.incomes = action.payload;
    },
    addNewExpense: (state, action: PayloadAction<IExpenseState>) => {
      state.expenses.push(action.payload);
    },
  },
});

export const { addNewExpense, getExpenses, getIncomes } = expensesSlice.actions;

export default expensesSlice.reducer;
