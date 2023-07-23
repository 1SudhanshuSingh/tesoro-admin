import React from "react";
import { Grid, TextField, Button, Modal, Box } from "@mui/material";

interface CreateNewOptionsProps {
  // handleBackToFilter: (show: boolean) => void;
  //added
  isLoading?: boolean;
  setNewOptionName: (value: string) => void;
  openCreateNew: boolean;
  closeCreateNew?: () => void;
  newOptionName: string;
  handleCreateButtonClick: () => void;
}
const CreateNewOptions: React.FC<CreateNewOptionsProps> = ({
  // handleBackToFilter,
  //adeed
  isLoading,
  setNewOptionName,
  newOptionName,
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
        {/* <Grid item sm={3}> */}
        <h3>Create New Option</h3>
        <TextField
          label="New Option"
          variant="outlined"
          fullWidth
          value={newOptionName}
          onChange={(e) => {
            var value = e.target.value;
            return setNewOptionName(value);
          }}
        />

        <Grid container marginTop={2}>
          <Grid marginRight={2}>
            <Button
              variant="outlined"
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
        {/* </Grid> */}
      </Box>
    </Modal>
  );
};
export default CreateNewOptions;
