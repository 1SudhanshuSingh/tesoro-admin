import React from "react";
import { Grid, TextField, Button, Modal, Box } from "@mui/material";
import { Filter } from "../../hooks/Filter/useFiltersAvailableForProdId";

interface CreateNewOptionsProps {
  handleBackToFilter:  (show: boolean) => void;
}
const CreateNewOptions: React.FC<CreateNewOptionsProps> = ({handleBackToFilter}) => {
  return (
    // <Modal
    //   open={openCreateNew}
    //   onClose={closeCreateNew}
    //   aria-labelledby="large-modal-title"
    //   aria-describedby="large-modal-description"
    //   closeAfterTransition
    // >
    <Grid item sm={3}>
      <h3>Create New Option</h3>
      <TextField label="New Filter" variant="outlined" fullWidth />
      <Grid container gap={2} marginTop={2}>
        <Grid>
          <Button variant="outlined" onClick={() => handleBackToFilter(true)}>
            Go back to filters
          </Button>
        </Grid>
        <Grid>
          <Button variant="contained">Submit</Button>
        </Grid>
      </Grid>
    </Grid>
    // </Modal>
  );
};
export default CreateNewOptions;
