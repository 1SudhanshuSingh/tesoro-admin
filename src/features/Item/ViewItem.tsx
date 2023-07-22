import { useState, useEffect } from "react";
import {
  Box,
  Fab,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { DataGrid, GridAddIcon, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router";
import { useGetAllSubproduct } from "../../hooks/Subproduct/useGetAllSubProduct"; // Update import name
import { useGetItems } from "../../hooks/Item/useGetItems";
import { useProducts } from "../../hooks/Product/useGetAllProdThruCatId";
import { useCategories } from "../../hooks/Category/useGetAllCategory";

const columns: GridColDef[] = [
  { field: "id", headerName: "id", width: 100 },
  { field: "item_subprodID", headerName: "Subprod ID", width: 100 },
  { field: "item_sku", headerName: "SKU", width: 100 },
  { field: "item_qty", headerName: "QTY", width: 100 },
  { field: "item_active", headerName: "Active", width: 100 },
  { field: "item_price", headerName: "Price", width: 100 },
];

const ViewItem: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSubProduct, setSelectedSubProduct] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const { data: response } = useCategories();
  const categories = response?.jsonResponse;
  
  const { data: prodData } = useProducts(
    selectedCategory ? parseInt(selectedCategory) : undefined,
    0,
    1000
  );
  const productsData = prodData?.jsonResponse || [];

  const [subProducts, setSubProducts] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  const { allSubProductsData, isLoading: subproductLoading } =
    useGetAllSubproduct(Number(selectedProduct), 0 , 1000);
  const { data: items, isLoading: itemLoading } = useGetItems(
    Number(selectedSubProduct),
    0,
    1000
  );

  useEffect(() => {
    if (allSubProductsData) {
      const subProductsOptions = allSubProductsData.map((subprod) => ({
        label: subprod.subprod_Name,
        value: subprod.subprodID.toString(),
      }));
      setSubProducts(subProductsOptions);
    }
  }, [allSubProductsData]);
  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{
          padding: "1rem",
        }}
      >
        <h3> All Items</h3>
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => navigate("./createItem")}
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
              {categories?.map((category) => (
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
              {productsData.map((product) => (
                <MenuItem key={product.prodID} value={product.prodID.toString()}>
                  {product.prod_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="SubProduct_Dropdown">Choose SubProduct</InputLabel>
            <Select
              labelId="SubProduct_Dropdown"
              id="select_SubProduct_Dropdown"
              value={selectedSubProduct}
              label="Choose SubProduct"
              fullWidth
              onChange={(event) => setSelectedSubProduct(event.target.value)}
            >
              {subproductLoading ? (
                <MenuItem value="">Loading...</MenuItem>
              ) : (
                subProducts.map((subprod) => (
                  <MenuItem key={subprod.value} value={subprod.value}>
                    {subprod.label}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Box>
        <DataGrid
          rows={
            items?.map((row) => ({
              ...row,
            })) || []
          }
          columns={columns.map((column) => ({
            ...column,
            flex: 1,
            align: "center",
            headerAlign: "center",
            width: 100,
          }))}
          loading={itemLoading}
          pagination
        />
      </Box>
    </div>
  );
};

export default ViewItem;
