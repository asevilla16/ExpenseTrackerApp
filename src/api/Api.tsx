import axios from "axios";
import {
  IExpenseCreation,
  IIncomeCreation,
} from "../features/AddTransaction/interface";
import { ICategoryCreation } from "../features/AddCategory/interface";

// const baseURL = "http://localhost:5000/api/";
const baseURL = "expensetrackerapi-production-b821.up.railway.app/api/";

export const getAllExpenses = async () => {
  const { data } = await axios.get(`${baseURL}expense`);
  return data;
};

export const getAllIncomes = async () => {
  const { data } = await axios.get(`${baseURL}income`);
  return data;
};

export const getTotalIncomesByCategory = async () => {
  const { data } = await axios.get(`${baseURL}income/find-by-category`);
  return data;
};

export const getTotalExpensesByCategory = async () => {
  const { data } = await axios.get(`${baseURL}expense/find-by-category`);
  return data;
};

export const getIncomeById = async (id: string) => {
  const { data } = await axios.get(`${baseURL}income/${id}`);
  return data;
};

export const getExpenseById = async (id: string) => {
  const { data } = await axios.get(`${baseURL}expense/${id}`);
  return data;
};

export const createNewIncome = async (request: IIncomeCreation) => {
  const { data } = await axios.post(`${baseURL}income`, request);
  return data;
};

export const updateIncome = async (id: string, request: IIncomeCreation) => {
  const { data } = await axios.patch(`${baseURL}income/${id}`, request);
  return data;
};

export const createNewExpense = async (request: IExpenseCreation) => {
  const { data } = await axios.post(`${baseURL}expense`, request);
  return data;
};

export const updateExpense = async (id: string, request: IExpenseCreation) => {
  const { data } = await axios.patch(`${baseURL}expense/${id}`, request);
  return data;
};

export const deleteIncome = async (id: string) => {
  const { data } = await axios.delete(`${baseURL}income/${id}`);
  return data;
};
