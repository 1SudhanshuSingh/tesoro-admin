import { Grid, TextField, Button } from "@mui/material";
import { LargeModal, OptionList } from "../../../components";
import { OptionData } from "../types";

interface OptionalModalProps {
  show: boolean;
  data: OptionData;
  handleShow: (show: boolean) => void;
  handleBackToFilter: (show: boolean) => void;
}

const OptionModal: React.FC<OptionalModalProps> = ({
  show,
  data,
  handleShow,
  handleBackToFilter,
}) => {
  return (
    <LargeModal
      title="Options"
      open={show}
      onClose={() => handleShow(false)}
    >
      <Grid container gap={2}>
        <Grid sm={4}>
          <h3>Associated Options</h3>
          <OptionList options={data} />
        </Grid>
        <Grid sm={4}>
          <h3>Globally Available Options</h3>
          <OptionList options={data} />
        </Grid>
        <Grid sm={3}>
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
      </Grid>
    </LargeModal>
  );
};

export default OptionModal;
