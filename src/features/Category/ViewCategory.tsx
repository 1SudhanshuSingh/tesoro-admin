import * as React from "react";
import { Box, Chip, Fab } from "@mui/material";
import { DataGrid, GridAddIcon, GridColDef } from "@mui/x-data-grid";
import { dummyCategory } from "./DummyCategory";
import { useNavigate } from "react-router";

interface RowData {
  // id: number;
  category_catID: number;
  category_parentCategory: string;

  category_active: string;
  category_name: string;

  // category_image: string;
  // category_type: { id: number; value: string }[];
  // category_sequence: number;
  // category_filterList: { id: number; value: string }[];
}

const columns: GridColDef[] = [
  // { field: "id", headerName: "category. ID", width: 100 },
  {
    field: "category_catID",
    headerName: "CatID ",
   
  },
  {
    field: "category_parentCategory",
    headerName: "Parent Category",
    
  },
  {
    field: "category_name",
    headerName: "Category Name",
   
  },
  {
    field: "category_active",
    headerName: "Active",
    
  },
];

const rows: RowData[] = dummyCategory;

const Viewcategory: React.FC = () => {
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
        <h3>All Categories</h3>
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => navigate("./createCategory")}
        >
          <GridAddIcon />
        </Fab>
      </Box>
      <Box
        sx={{
          padding: "1rem",
        }}
      >
        <DataGrid
          rows={rows}
          // columns={columns}
          columns={columns.map((column) => ({
            ...column,
            flex: 1, // or any other flex value
            headerAlign: "center",
            align: "center",
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

export default Viewcategory;
