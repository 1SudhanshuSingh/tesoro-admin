import * as React from "react";
import { useState } from "react";
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
import { dummyProd } from "./Dummy";
import { useNavigate } from "react-router";

interface RowData {
  id: number;
  prod_catID: number;
  prod_active: string;
  prod_name: string;
  prod_type: { id: number; value: string }[];
  prod_sequence: number;
  prod_filterList: { id: number; value: string }[];
}

const columns: GridColDef[] = [
  { field: "id", headerName: "Prod. ID" },
  {
    field: "prod_catID",
    headerName: "CatID",
  },
  { field: "prod_active", headerName: "Active" },
  { field: "prod_name", headerName: "Name" },
  { field: "prod_sequence", headerName: "Sequence" },
  {
    field: "prod_filterList",
    headerName: "FilterList",
    width: 300,
    renderCell: (params) => {
      const prodtype = params.value as { id: number; value: string }[];
      return (
        <div>
          {prodtype.map((type, index) => (
            <Chip key={index} label={type.value} color="primary" />
          ))}
        </div>
      );
    },
  },
];

const rows: RowData[] = dummyProd;

const ViewProduct: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [staticRows] = useState(rows);
  const [filteredRows, setFilteredRows] = useState(rows);
  const handleFind = () => {
    const filteredCategory = filteredRows.filter(
      (row) => row?.id === parseInt(selectedCategory)
    );

    console.log("cat", selectedCategory);
    setFilteredRows(filteredCategory);
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
              <MenuItem value="Category1">Category 1</MenuItem>
              <MenuItem value="Category2">Category 2</MenuItem>
              <MenuItem value="Category3">Category 3</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleFind}>
            Find
          </Button>
        </Box>
        <DataGrid
          // rows={filteredRows}
          rows={filteredRows.map((row) => ({
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
