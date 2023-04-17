export interface IExpenseState {
  id: number;
  name: string;
  categoryId: number;
  amount: number;
  date: string;
}

export interface IExpensesState {
  expenses: IExpenseState[];
  incomes: IIncomeState[];
}

export interface IIncomeState {
  id: number;
  name: string;
  categoryId: number;
  amount: number;
  date: string;
}
