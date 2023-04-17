import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import {
  createNewIncome,
  createNewExpense,
  getIncomeById,
  getExpenseById,
  updateIncome,
  updateExpense,
} from "../../api/Api";
import { IIncomeCreation } from "./interface";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useNavigate, useParams } from "react-router-dom";
import { getCategoriesByTransactionType } from "../../api/CategoryApi";
import { OperationType } from "../../interface/operation-types.enum";

const AddTransaction = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTransactionType, setSelectedTransactionType] =
    useState<OperationType>(OperationType.Income);
  const [categoriesList, setCategoriesList] = useState([]);
  const [transactionForm, setTransactionForm] = useState({
    name: "",
    amount: 0,
    category: "",
    operationType: "",
  });

  const { id, transaction } = useParams();

  const transactionTypes = ["income", "expense"];
  const toast = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    handleGetCategories();
  }, [selectedTransactionType]);

  useEffect(() => {
    handleGetTransactionInfo();
  }, []);

  const handleGetCategories = () => {
    getCategoriesByTransactionType(selectedTransactionType).then((res) => {
      const response = res.map((item) => {
        return item.description;
      });
      console.log(response);
      setCategoriesList([...response]);
    });
  };

  const handleGetTransactionInfo = () => {
    if (id) {
      return getTransactionInfo();
    }
  };

  const getTransactionInfo = () => {
    if (transaction === "Incomes") {
      getIncomeById(id).then((res: any) => {
        setTransactionForm({
          ...res,
        });
        setSelectedTransactionType(OperationType.Income);
        setSelectedCategory(res.categoryId);
      });
    }

    if (transaction === "Expenses") {
      getExpenseById(id).then((res: any) => {
        setTransactionForm({
          ...res,
        });
        setSelectedTransactionType(OperationType.Expense);
        setSelectedCategory(res.categoryId);
      });
    }
  };

  const handleCategoryDropdownChange = (e: any) => {
    setSelectedCategory(e.value);
    setTransactionForm({
      ...transactionForm,
      [e.target.name]: e.value,
    });
  };

  const handleTransactionDropdownChange = (e: any) => {
    setSelectedTransactionType(e.value);
    setTransactionForm({
      ...transactionForm,
      [e.target.name]: e.value,
    });
  };

  const handleInputChange = (e: any) => {
    setTransactionForm({
      ...transactionForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputNumberChange = (e: any) => {
    setTransactionForm({
      ...transactionForm,
      [e.originalEvent.target.name]: e.value,
    });
  };

  const handleSave = async () => {
    if (id) {
      return await handleEditTransaction();
    }

    return await handleCreateTransaction();
  };

  const handleEditTransaction = async () => {
    if (selectedTransactionType === OperationType.Income) {
      return await editIncome();
    }

    if (selectedTransactionType === OperationType.Expense) {
      return await editExpense();
    }
  };

  const editIncome = async () => {
    const res = await updateIncome(id, {
      name: transactionForm.name,
      categoryId: transactionForm.category,
      amount: transactionForm.amount,
    });

    if (res) {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Transaction updated successfully",
      });

      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  const editExpense = async () => {
    const res = await updateExpense(id, {
      name: transactionForm.name,
      categoryId: transactionForm.category,
      amount: transactionForm.amount,
    });

    if (res) {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Transaction updated successfully",
      });

      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  const handleCreateTransaction = async () => {
    if (selectedTransactionType === "income") {
      return await createIncome();
    }

    if (selectedTransactionType === "expense") {
      return await createExpense();
    }
  };

  const createIncome = async () => {
    const res = await createNewIncome({
      name: transactionForm.name,
      categoryId: transactionForm.category,
      amount: transactionForm.amount,
    });

    if (res) {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Transaction created successfully",
      });

      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  const createExpense = async () => {
    const res = await createNewExpense({
      name: transactionForm.name,
      categoryId: transactionForm.category,
      amount: transactionForm.amount,
    });

    if (res) {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Transaction created successfully",
      });

      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="card">
        <h2>{id ? "Edit Transaction" : "Add new Transaction"}</h2>

        <div className="flex flex-column md:flex-row card-container gap-3 indigo-container">
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-pencil"></i>
            </span>
            <InputText
              placeholder="Name"
              value={transactionForm.name}
              name="name"
              onChange={handleInputChange}
            />
          </div>

          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">$</span>
            <InputNumber
              value={transactionForm.amount}
              placeholder="Amount"
              name="amount"
              onChange={handleInputNumberChange}
            />
            <span className="p-inputgroup-addon">.00</span>
          </div>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-list"></i>
            </span>
            <Dropdown
              name="operationType"
              placeholder="Select a transaction type"
              className="w-full md:w-14rem"
              value={selectedTransactionType}
              options={transactionTypes}
              onChange={(e) => handleTransactionDropdownChange(e)}
            />
          </div>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-list"></i>
            </span>
            <Dropdown
              name="category"
              placeholder="Select a category"
              className="w-full md:w-14rem"
              value={selectedCategory}
              options={categoriesList}
              onChange={(e) => handleCategoryDropdownChange(e)}
            />
          </div>
        </div>
        <div className="flex flex-column md:flex-row card-container mt-4 gap-3 indigo-container">
          <Button label="Save" onClick={handleSave} />
        </div>
      </div>
    </>
  );
};

export default AddTransaction;
