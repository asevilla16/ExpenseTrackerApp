import { BrowserRouter, Route, Routes } from "react-router-dom";
import Expenses from "../features/Expenses/Expenses";
import Categories from "../features/Settings/Categories/Categories";
import AddTransaction from "../features/AddTransaction/AddTransaction";
import AddCategory from "../features/AddCategory/AddCategory";
import MonthlyReports from "../features/Reports/MonthlyReports/MonthlyReports";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Expenses />} />
        <Route path="/add-transaction" element={<AddTransaction />} />
        <Route
          path="/edit-transaction/:transaction/:id"
          element={<AddTransaction />}
        />
        <Route path="/monthly-report" element={<MonthlyReports />} />
        <Route
          path="/edit-category/:transaction/:id"
          element={<AddCategory />}
        />
        <Route path="/settings/categories" element={<Categories />} />
        <Route path="/settings/add-category" element={<AddCategory />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
