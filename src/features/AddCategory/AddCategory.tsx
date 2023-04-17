import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useRef, useState } from "react";
import { ICategoryCreation } from "./interface";
import {
  createNewCategory,
  getCategoryById,
  updateCategory,
} from "../../api/CategoryApi";
import { useNavigate, useParams } from "react-router-dom";
import { Toast } from "primereact/toast";

const AddCategory = () => {
  const [operationType, setOperationType] = useState("");
  const [categoryForm, setCategoryForm] = useState({
    description: "",
    operationType: "",
  });

  const navigate = useNavigate();
  const toast = useRef(null);
  const { transaction, id } = useParams();

  useEffect(() => {
    handleGetTransactionInfo();
  }, []);

  const handleGetTransactionInfo = () => {
    if (id) {
      return getTransactionInfo();
    }
  };

  const getTransactionInfo = () => {
    if (transaction === "Categories") {
      getCategoryById(id).then((res: any) => {
        setCategoryForm({
          description: res.description,
          operationType: res.operationType,
        });
        setOperationType(res.operationType);
      });
    }
  };

  const handleInputChange = (e) => {
    setCategoryForm({
      ...categoryForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleTransactionDropdownChange = (e: any) => {
    setOperationType(e.value);
    setCategoryForm({
      ...categoryForm,
      [e.target.name]: e.value,
    });
  };

  const handleSave = async () => {
    if (id) {
      return await handleEditCategory();
    }

    return await handleCreateCategory();
  };

  const handleEditCategory = async () => {
    let request: ICategoryCreation = {
      description: categoryForm.description,
      operationType: categoryForm.operationType,
    };

    const res = await updateCategory(id, request);

    if (res) {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Category updated successfully",
      });

      setTimeout(() => {
        navigate("/settings/categories");
      }, 1000);
    }
  };

  const handleCreateCategory = async () => {
    let request: ICategoryCreation = {
      description: categoryForm.description,
      operationType: categoryForm.operationType,
    };

    const res = await createNewCategory(request);

    if (res) {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Category created successfully",
      });

      setTimeout(() => {
        navigate("/settings/categories");
      }, 1000);
    }
  };

  const operationTypes = ["income", "expense"];

  return (
    <>
      <Toast ref={toast} />

      <h2>Add new Category</h2>
      <div className="flex flex-column md:flex-row card card-container gap-3 indigo-container">
        <div className="p-inputgroup">
          <span className="p-inputgroup-addon">
            <i className="pi pi-pencil"></i>
          </span>
          <InputText
            value={categoryForm.description}
            placeholder="Name"
            name="description"
            onChange={handleInputChange}
          />
        </div>
        <div className="p-inputgroup">
          <span className="p-inputgroup-addon">
            <i className="pi pi-list"></i>
          </span>
          <Dropdown
            name="operationType"
            placeholder="Select a transaction type"
            className="w-full md:w-14rem"
            value={operationType}
            options={operationTypes}
            onChange={(e) => handleTransactionDropdownChange(e)}
          />
        </div>
      </div>
      <div className="flex flex-column md:flex-row card card-container mt-4 gap-3 indigo-container">
        <Button label="Save" onClick={handleSave} />
      </div>
    </>
  );
};

export default AddCategory;
