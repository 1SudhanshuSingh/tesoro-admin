import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CreateProduct, CreateSubProduct, Dashboard, ViewProduct, ViewSubProduct } from './features';

const RouterConfig: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/product" element={<ViewProduct />} />
      <Route path="/product/create" element={<CreateProduct />} />
      <Route path="/subproduct" element={<ViewSubProduct />} />
      <Route path="/subproduct/create" element={<CreateSubProduct />} />
    </Routes>
  );
};

export default RouterConfig;
