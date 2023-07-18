import * as React from "react";
import { Box, Fab, IconButton } from "@mui/material";
import { DataGrid, GridAddIcon, GridColDef } from "@mui/x-data-grid";
import { dummyProd } from "./Dummy";
import { useNavigate } from "react-router";
import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
interface RowData {
  id: number;
  name: string;
}

const columns: GridColDef[] = [
  { field: "id", headerName: "Filter. ID", width: 100 },
  { field: "name", headerName: "Filter Name", width: 300 },
  {
    field: "edit",
    headerName: "Edit",
    width: 100,
    renderCell: (params) => (
      <IconButton
        color="primary"
        aria-label="edit"
        component="span"
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        onClick={() => console.log(params.row.id)}
      >
        <EditIcon />
      </IconButton>
    ),
  },
  {
    field: "delete",
    headerName: "Delete",
    width: 100,
    renderCell: (params) => (
      <IconButton
        color="primary"
        aria-label="edit"
        component="span"
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        onClick={() => console.log(params.row.id)}
      >
        <HighlightOffIcon />
        {/* <DeleteIcon /> */}
      </IconButton>
    ),
  },
];

const rows: RowData[] = dummyProd;

const ViewFilter: React.FC = () => {
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
        <h3>View Filters</h3>
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => navigate("./create")}
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

export default ViewFilter;
