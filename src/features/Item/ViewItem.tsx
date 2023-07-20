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
  const [subProducts, setSubProducts] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  const { allSubProductsData, isLoading: subproductLoading } =
    useGetAllSubproduct(0);
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
  console.log(items);
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
