import * as React from "react";

import { DataGrid, GridAddIcon, GridColDef } from "@mui/x-data-grid";
import { dummyProd } from "../SubProduct/Dummy";
import { useNavigate } from "react-router";
import { useState } from "react";
import {
  Box,
  Chip,
  Fab,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  SelectChangeEvent,
  Button,
} from "@mui/material";
// interface RowData {
//   cat_id: Number;
//   id: number;
//   prod_id: number;
//   SubProd_active: string;
//   SubProd_FilterValues: string;
//   SubProd_name: string;
//   SubProd_Filter: string;

//   // SubProd_description: string;
//   // SubProd_image: string;
//   // SubProd_type: { id: number; value: string }[];
//   // SubProd_sequence: number;
//   // SubProd_filterList: { id: number; value: string }[];
// }

interface RowData {
  id: number;
  prod_id: number;
  SubProd_FilterValues: string;
  SubProd_name: string;
  SubProd_active: string;
  SubProd_Filter: string;

  //   category: string;
  //   products: {
  //     id: number;

  //     prod_active: string;
  //     prod_name: string;
  //     prod_description: string;
  //     prod_image: string;
  //     prod_type: { id: number; value: string }[];
  //     prod_sequence: number;
  //     prod_filterList: { id: number; value: string }[];
  //     subProducts: {
  //       id: number;
  //       prod_id: number;
  //       SubProd_FilterValues: string;
  //       SubProd_name: string;
  //       SubProd_active: string;
  //       SubProd_Filter: string;
  //     }[];
  //   }[];
  //
}

const columns: GridColDef[] = [
  { field: "id", headerName: "SubID ", width: 100 },
  { field: "prod_id", headerName: "ProductID", width: 100 },
  { field: "SubProd_FilterValues", headerName: "FilterValues", width: 100 },
  { field: "SubProd_name", headerName: "SubProductName", width: 100 },
  { field: "SubProd_active", headerName: "Active", width: 100 },
  { field: "SubProd_Filter", headerName: "SubProdFilter", width: 100 },
  //  {
  //     field: "prod_filterList",
  //     headerName: "SubProdFilter",
  //     width: 300,
  //     renderCell: (params) => {
  //       const prodtype = params.value as { id: number; value: string }[];
  //       return (
  //         <div>
  //           {prodtype.map((type, index) => (
  //             <Chip key={index} label={type.value} color="primary" />
  //           ))}
  //         </div>
  //       );
  //     },
  //   },
];

const rows: RowData[] = dummyProd;

const ViewProduct: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [staticRows] = useState(rows);
  const [filteredRows, setFilteredRows] = useState(rows);
  // const handleChangeCategory = (event: SelectChangeEvent<string>) => {
  //   console.log(event.target.value);
  //   setSelectedCategory(event.target.value);
  //};
  // const handleChangeProduct = (event: SelectChangeEvent<string>) => {
  //   setSelectedProduct(event.target.value);
  // };

  const handleFind = () => {
    // Perform logic based on the selectedCategory and selectedProduct values
    // Update the filteredRows state or any other data manipulation you need to do
    const filteredCategory = filteredRows.filter(
      (row) => row?.id === parseInt(selectedCategory)
    );
    const filteredProduct = filteredCategory?.filter(
      (row) => row?.prod_id === parseInt(selectedProduct)
    );
    console.log("cat", selectedCategory);
    setFilteredRows(filteredCategory && filteredProduct);
    console.log("both", filteredCategory && filteredProduct);
    console.log(filteredProduct);
  };

  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{
          padding: "1rem",
        }}
      >
        <h3>All SubProducts</h3>
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => navigate("./createSubProduct")}
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
          {/* dropdown */}
          <FormControl fullWidth>
            <InputLabel id="category_Dropdown">Choose Category</InputLabel>
            <Select
              labelId="category_Dropdown"
              id="select_category_Dropdown"
              value={selectedCategory}
              label="Choose Category"
              fullWidth
              onChange={(event) => {
                setSelectedCategory(event.target.value);
                setFilteredRows(staticRows);
              }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="1">category 1</MenuItem>
              <MenuItem value="2">Category 2</MenuItem>
              <MenuItem value="3">Category 3</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="category_Dropdown">Choose Product </InputLabel>
            <Select
              labelId="Product _Dropdown"
              id="select_Product _Dropdown"
              value={selectedProduct}
              label="Choose Product "
              fullWidth
              onChange={(event) => {
                setSelectedProduct(event.target.value);
                setFilteredRows(staticRows);
              }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="1">Product 1</MenuItem>
              <MenuItem value="12">Product 2</MenuItem>
              <MenuItem value="Product 3">Product 3</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleFind}>
            Find
          </Button>
        </Box>
        <DataGrid
          // rows={filteredRows}
          rows={filteredRows?.map((row) => ({
            ...row,
            // or any other flex value
          }))}
          columns={columns.map((column) => ({
            ...column,
            flex: 1, // or any other flex value
            align: "center",
            headerAlign: "center",
            width: 100,
          }))}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[10, 20]}
        />
      </Box>
    </div>
  );
};

export default ViewProduct;
