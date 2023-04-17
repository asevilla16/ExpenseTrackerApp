import React, { useEffect, useState } from "react";
import TableComponent from "../../../components/TableComponent/TableComponent";
import { getAllCategories } from "../../../api/CategoryApi";
import { categoriesColumns } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    getAllCategories().then((res) => {
      const response = res.map((category) => {
        return {
          ...category,
          id: category._id,
        };
      });
      console.log(response);
      setCategories([...response]);
    });
  };

  const handleNewCategory = () => {
    navigate("/settings/add-category");
  };

  return (
    <>
      <Button
        label="Add new Category"
        className="mt-3"
        onClick={handleNewCategory}
        icon="pi pi-plus"
      />
      <TableComponent
        data={categories}
        transaction="Categories"
        columns={categoriesColumns}
      />
    </>
  );
};

export default Categories;
