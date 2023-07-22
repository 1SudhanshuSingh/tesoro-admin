import { useEffect, useState } from "react";
import {
  Box,
  Chip,
  Fab,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { DataGrid, GridAddIcon, GridColDef } from "@mui/x-data-grid";
import { useProducts } from "../../hooks/Product/useGetAllProdThruCatId";
import { useNavigate } from "react-router";
import { useCategories } from "../../hooks/Category/useGetAllCategory";
import { useGetAllSubproduct } from "../../hooks/Subproduct/useGetAllSubProduct";

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
  const { data: response, isLoading } = useCategories();
  const categories = response?.jsonResponse || [];

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const { data: prodData, isLoading: productsLoading } = useProducts(
    selectedCategory ? Number(selectedCategory) : undefined,
    0,
    1000
  );
  const productsData = prodData?.jsonResponse;

  const { allSubProductsData, isLoading: subProductsLoading } = useGetAllSubproduct(
    selectedProduct ? Number(selectedProduct) : 0,
    0,
    1000
  );

  useEffect(() => {
    if (selectedCategory === "" || !productsData) {
      return;
    }

    setSelectedProduct("");
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
        <h3>All Subproducts</h3>
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => navigate("./createSubproduct")}
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
              {categories.map((category) => (
                <MenuItem key={category.catID} value={category.catID.toString()}>
                  {category.category_name}
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
              onChange={(event) => setSelectedProduct(event.target.value)}
              disabled={!selectedCategory}
            >
              {productsData?.map((product) => (
                <MenuItem key={product.prodID} value={product.prodID.toString()}>
                  {product.prod_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <DataGrid
          rows={allSubProductsData}
          columns={columns.map((column) => ({
            ...column,
            flex: 1,
            align: "center",
            headerAlign: "center",
            width: 100,
          }))}
          loading={isLoading || productsLoading || subProductsLoading}
          autoHeight
        />
      </Box>
    </div>
  );
};

export default ViewProduct;
