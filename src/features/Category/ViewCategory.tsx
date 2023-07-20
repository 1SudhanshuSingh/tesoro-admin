import * as React from "react";
import { Box, Fab } from "@mui/material";
import { DataGrid, GridAddIcon, GridColDef } from "@mui/x-data-grid";
import { useCategories } from "../../hooks/Category/useGetAllCategory";
import { useNavigate } from "react-router";


const columns: GridColDef[] = [
  {
    field: "row",
    headerName: "Row",
    flex: 1,
    headerAlign: "center",
    align: "center",
    width: 100,
  },
  {
    field: "cat_name",
    headerName: "Category Name",
    flex: 1,
    headerAlign: "center",
    align: "center",
    width: 200,
  },
  {
    field: "parent_categoryID",
    headerName: "Parent Category",
    flex: 1,
    headerAlign: "center",
    align: "center",
    width: 200,
  },
];

const Viewcategory: React.FC = () => {
  const navigate = useNavigate();
  const { data: response, isLoading, error } = useCategories();
  const rows = response?.jsonResponse || [];
  const rowsWithId = rows.map((row) => ({
    ...row,
    id: row.row.toString(),
  }));
  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
          rows={rowsWithId}
          columns={columns}
          loading={isLoading}
          autoHeight
        />
      </Box>
    </div>
  );
};

export default Viewcategory;
