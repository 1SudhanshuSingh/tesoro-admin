import { useState, useEffect } from "react";
import {
  Box,
  Fab,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from "@mui/material";
import { DataGrid, GridAddIcon, GridColDef } from "@mui/x-data-grid";
import { useProducts } from "../../hooks/Product/useGetAllProdThruCatId";
import { useNavigate } from "react-router";
import {
  Category,
  useCategories,
} from "../../hooks/Category/useGetAllCategory";

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
          {prodtype &&
            prodtype.map((type, index) => (
              <Chip key={index} label={type.value} color="primary" />
            ))}
        </div>
      );
    },
  },
];

const ViewProduct: React.FC = () => {
  const navigate = useNavigate();
  const { data: response, isLoading } = useCategories();
  const categories = response?.jsonResponse || [];

  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredRows, setFilteredRows] = useState<RowData[]>([]);

  const { data: prodData, isLoading: productsLoading } = useProducts(
    selectedCategory ? Number(selectedCategory) : undefined,
    0,
    1000
  );
  const productsData = prodData?.jsonResponse || [];

  useEffect(() => {
    if (selectedCategory === "") {
      setFilteredRows([]);
    } else {
      const filteredProd = productsData?.filter(
        (row: { prod_catID: number }) =>
          row.prod_catID === Number(selectedCategory)
      );
      const rowsWithIds = filteredProd?.map((row: { prodId: number }) => ({
        ...row,
        id: row.row,
      }));
      setFilteredRows(rowsWithIds || []);
    }
  }, [selectedCategory, productsData]);

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
              onChange={(event) => setSelectedCategory(event.target.value)}
            >
              {categories.map((category: Category) => (
                <MenuItem key={category.row} value={category.row.toString()}>
                  {category.cat_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <DataGrid
          rows={filteredRows}
          columns={columns.map((column) => ({
            ...column,
            flex: 1,
            align: "center",
            headerAlign: "center",
            width: 100,
          }))}
          loading={isLoading || productsLoading}
          autoHeight
        />
      </Box>
    </div>
  );
};

export default ViewProduct;
