import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  CreateProduct,
  CreateSubProduct,
  Dashboard,
  ViewProduct,
  ViewSubProduct,
  CreateItem,
  ViewItem,
  CreateCategory,
  ViewCategory,
  AuthPage,
} from "./features";

const RouterConfig: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/category" element={<ViewCategory />} />
      <Route path="/category/createCategory" element={<CreateCategory />} />
      <Route path="/product" element={<ViewProduct />} />
      <Route path="/product/createProduct" element={<CreateProduct />} />
      <Route path="/subproduct" element={<ViewSubProduct />} />
      <Route
        path="/subproduct/createSubProduct"
        element={<CreateSubProduct />}
      />
      <Route path="/item" element={<ViewItem />} />
      <Route path="/item/createItem" element={<CreateItem />} />
    </Routes>
  );
};

export default RouterConfig;
