import axios from "axios";
import { ICategoryCreation } from "../features/AddCategory/interface";

// const baseURL = "http://localhost:5000/api/";
const baseURL = "https://expensetrackerapi-production-b821.up.railway.app/api/";

export const getCategoriesByTransactionType = async (
  transactionType: string
) => {
  const { data } = await axios.get(
    `${baseURL}category/find-by-operation-type/${transactionType}`
  );
  return data;
};

export const getAllCategories = async () => {
  const { data } = await axios.get(`${baseURL}category`);
  return data;
};

export const getCategoryById = async (id: string) => {
  const { data } = await axios.get(`${baseURL}category/${id}`);
  return data;
};

export const createNewCategory = async (request: ICategoryCreation) => {
  const { data } = await axios.post(`${baseURL}category`, request);
  return data;
};

export const updateCategory = async (
  id: string,
  request: ICategoryCreation
) => {
  const { data } = await axios.patch(`${baseURL}category/${id}`, request);
  return data;
};
