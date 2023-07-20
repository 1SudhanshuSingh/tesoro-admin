/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Chip,
  Fab,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from "@mui/material";
import { DataGrid, GridAddIcon, GridColDef } from "@mui/x-data-grid";
import { useProducts } from "../../hooks/Product/useGetAllProdThruCatId";
import { useGetSubproduct } from "../../hooks/Subproduct/useGetSubproduct";
import { useNavigate } from "react-router";
import { useCategories } from "../../hooks/Category/useGetAllCategory";

interface RowData {
  id: string;
  prod_catID: number;
  prod_active: string;
  prod_name: string;
  prod_type: { id: number; value: string }[];
  prod_sequence: number;
  prod_filterList: { id: number; value: string }[];
}

const columns: GridColDef[] = [
  { field: "row", headerName: "Subprod ID" },
  {
    field: "subprod_Name",
    headerName: "Subprod Name",
  },
  { field: "subprod_active", headerName: "Active" },
  {
    field: "subprod_filterList",
    headerName: "Filter List",
    width: 300,
    renderCell: (params) => {
      const prodtype = params.value as { filter_id: number; filter_name: string }[];
      if (!prodtype) {
        return null;
      }
      return (
        <div>
          {prodtype.map((type) => (
            <Chip key={type.filter_id} label={type.filter_name} color="primary" />
          ))}
        </div>
      );
    },
  },
  {
    field: "subprod_filterValues",
    headerName: "Options List",
    width: 300,
    renderCell: (params) => {
      const prodtype = params.value as { filter_optionID: number; filter_optionName: string }[];
      if (!prodtype) {
        return null;
      }
      return (
        <div>
          {prodtype.map((type) => (
            <Chip key={type.filter_optionID} label={type.filter_optionName} color="primary" />
          ))}
        </div>
      );
    },
  },
];

const ViewProduct: React.FC = () => {
  const navigate = useNavigate();
  const { data: response, isLoading, error } = useCategories();
  const categories = response?.jsonResponse || [];

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const { data: prodData, isLoading: productsLoading } = useProducts(
    selectedCategory ? parseInt(selectedCategory) : undefined,
    0,
    1000
  );
  const productsData = prodData?.jsonResponse || [];

  const { subProductsData, isLoading: subProductsLoading } = useGetSubproduct(
    selectedProduct ? parseInt(selectedProduct) : 0,
    0,
    1000
  );
  
  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{
          padding: "1rem",
        }}
      >
        <h3>All Products</h3>
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => navigate("./createProduct")}
        >
          <GridAddIcon />
        </Fab>
      </Box>
      <Box
        sx={{
          padding: "1rem",
        }}
      >
        <Box
          sx={{
            padding: "1rem",
          }}
          display="flex"
          justifyContent="space-between"
        >
          <FormControl fullWidth>
            <InputLabel id="category_Dropdown">Choose Category</InputLabel>
            <Select
              labelId="category_Dropdown"
              id="select_category_Dropdown"
              value={selectedCategory}
              label="Choose Category"
              fullWidth
              onChange={(event) => setSelectedCategory(event.target.value as string)}
            >
              {categories.map((category) => (
                <MenuItem key={category.row} value={category.row.toString()}>
                  {category.cat_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="product_Dropdown">Choose Product</InputLabel>
            <Select
              labelId="product_Dropdown"
              id="select_product_Dropdown"
              value={selectedProduct}
              label="Choose Product"
              fullWidth
              onChange={(event) => setSelectedProduct(event.target.value as string)}
              disabled={!selectedCategory}
            >
              {productsData.map((product) => (
                <MenuItem key={product.row} value={product.row.toString()}>
                  {product.prod_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <DataGrid
          rows={subProductsData}
          columns={columns.map((column) => ({
            ...column,
            flex: 1,
            align: "center",
            headerAlign: "center",
            width: 100,
          }))}
          loading={isLoading || productsLoading || subProductsLoading}
          autoHeight
          pageSize={10}
        />
      </Box>
    </div>
  );
};

export default ViewProduct;
