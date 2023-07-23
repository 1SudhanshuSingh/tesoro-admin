import React from "react";
import { Grid, TextField, Button, Modal, Box } from "@mui/material";
import useFiltersAvailableForProdId from "../../hooks/Filter/useFiltersAvailableForProdId";

interface CreateNewFilterProps {
  isLoading?: boolean;
  setNewFilterName: (value: string) => void;
  openCreateNew: boolean;
  closeCreateNew?: () => void;
  newFilterName: string;
  handleCreateButtonClick: () => void;
}
const CreateNewFilter: React.FC<CreateNewFilterProps> = ({
  isLoading,
  setNewFilterName,
  newFilterName,
  handleCreateButtonClick,
  openCreateNew,
  closeCreateNew,
}) => {
  return (
    <Modal
      open={openCreateNew}
      onClose={closeCreateNew}
      aria-labelledby="large-modal-title"
      aria-describedby="large-modal-description"
      closeAfterTransition
    >
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          width: "50%",
          margin: "0 25%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: "1rem",
        }}
      >
        <h3>Create New Filter</h3>
        <TextField
          label="New Filter"
          variant="outlined"
          fullWidth
          value={newFilterName}
          onChange={(e) => {
            var value = e.target.value;
            return setNewFilterName(value);
          }}
        />
        <Grid container marginTop={2}>
          <Grid marginRight={2}>
            <Button
              variant="contained"
              onClick={handleCreateButtonClick}
              disabled={isLoading}
            >
              Submit
            </Button>
          </Grid>
          <Grid marginRight={2}>
            <Button
              variant="contained"
              onClick={closeCreateNew}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};
export default CreateNewFilter;
