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
  SelectChangeEvent,
  Button,
} from "@mui/material";
import { DataGrid, GridAddIcon, GridColDef } from "@mui/x-data-grid";
import { dummyItem } from "../Item/Dummy";
import { useNavigate } from "react-router";

interface RowData {
  id: number;
  item_subProd: string;
  item_active: string;
  item_sku: string;
  item_QTY: number;
  item_PRICE: number;
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ItemID", width: 100 },
  { field: "item_subProd", headerName: "itemSubProduct ", width: 100 },
  { field: "item_sku", headerName: "item SKU", width: 100 },
  { field: "item_QTY", headerName: "QTY", width: 100 },
  { field: "item_active", headerName: "Active", width: 100 },
  { field: "item_PRICE", headerName: " PRICE", width: 100 },
];
//   {
//     field: "item_type",
//     headerName: "item. type",
//     width: 300,
//     renderCell: (params) => {
//       const itemtype = params.value as { id: number; value: string }[];
//       return (
//         <div>
//           {itemtype.map((type) => (
//             <Chip key={type.id} label={type.value} color="primary" />
//           ))}
//         </div>
//       );
//     },
//   },
//   {
//     field: "item_filterList",
//     headerName: "item. FilterList",
//     width: 300,
//     renderCell: (params) => {
//       const itemtype = params.value as { id: number; value: string }[];
//       return (
//         <div>
//           {itemtype.map((type, index) => (
//             <Chip key={index} label={type.value} color="primary" />
//           ))}
//         </div>
//       );
//     },
//   },
//   { field: "item_sequence", headerName: "item. seq.", width: 100 },
// ];

const rows: RowData[] = dummyItem;

const ViewItem: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSubProduct, setSelectedSubProduct] = useState("");
  const [staticRows] = useState(rows);
  const [filteredRows, setFilteredRows] = useState(rows);

  const handleFind = () => {
    const filteredSubProduct = filteredRows.filter(
      (row) => row?.id === parseInt(selectedSubProduct)
    );

    console.log("subProd", selectedSubProduct);
    setFilteredRows(filteredSubProduct);
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
      > <Box
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
            onChange={(event) => {
              setSelectedSubProduct(event.target.value);
              setFilteredRows(staticRows);
            }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="SubProduct1">SubProduct 1</MenuItem>
            <MenuItem value="SubProduct2">SubProduct 2</MenuItem>
            <MenuItem value="SubProduct3">SubProduct 3</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleFind}>
          Find
        </Button>
        </Box>
        <DataGrid
          // rows={filteredRows}
          rows={rows.map((row) => ({
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

export default ViewItem;
