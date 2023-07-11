import * as React from "react";
import { Box, Chip, Fab } from "@mui/material";
import { DataGrid, GridAddIcon, GridColDef } from "@mui/x-data-grid";
import { dummyProd } from "./Dummy";
import { useNavigate } from "react-router";

interface RowData {
  id: number;
  prod_catID: number;
  prod_active: string;
  prod_name: string;
  prod_description: string;
  prod_image: string;
  prod_type: { id: number; value: string }[];
  prod_sequence: number;
  prod_filterList: { id: number; value: string }[];
}

const columns: GridColDef[] = [
  { field: "id", headerName: "Prod. ID", width: 100 },
  { field: "prod_catID", headerName: "Prod Cat. ID ", width: 100 },
  { field: "prod_active", headerName: "Active", width: 100 },
  { field: "prod_name", headerName: "Prod. name", width: 100 },
  { field: "prod_description", headerName: "Prod. Desc.", width: 100 },
  { field: "prod_image", headerName: "Prod. image", width: 100 },
  {
    field: "prod_type",
    headerName: "Prod. type",
    width: 300,
    renderCell: (params) => {
      const prodtype = params.value as { id: number; value: string }[];
      return (
        <div>
          {prodtype.map((type) => (
            <Chip key={type.id} label={type.value} color="primary" />
          ))}
        </div>
      );
    },
  },
  {
    field: "prod_filterList",
    headerName: "Prod. FilterList",
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
  { field: "prod_sequence", headerName: "Prod. seq.", width: 100 },
];

const rows: RowData[] = dummyProd;

const ViewProduct: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{
          padding: "1rem",
        }}
      >
        <h3>View Products</h3>
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => navigate("./createProduct")}
        >
          <GridAddIcon />
        </Fab>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[10, 20]}
      />
    </div>
  );
};

export default ViewProduct;
