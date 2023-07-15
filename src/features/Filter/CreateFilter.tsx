import { Grid, Button, TextField } from "@mui/material";
import { SearchableList } from "../../components";
import { Filters, Options, GlobalOptions } from "./Dummy";
import { useState } from "react";

const CreateProduct: React.FC = () => {
  const [showAddFilter, setShowAddFilter] = useState<boolean>(false);
  const [showAddOption, setShowAddOption] = useState<boolean>(false);
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Grid container>
          <Grid item xs={12}>
            <h3>Associate Filter List</h3>
            <SearchableList data={Filters} />
            <Button variant="outlined" onClick={() => setShowAddFilter(true)}>Associate new filter</Button>
            <Button variant="outlined">Submit</Button>
            <Button variant="outlined">Cancel</Button>
            // On cancel reset the state
            {showAddFilter && <Grid container spacing={2} marginTop={2}>
              <Grid item xs={8}>
                <TextField id="new-filter" label="New Filter" variant="standard" fullWidth />
              </Grid>
              <Grid item xs={4}>
                <Button variant="outlined">Add</Button>
              </Grid>
            </Grid>}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <Grid container>
          <Grid item xs={12}>
            <h3>Associated Options</h3>
            <SearchableList data={Options} />
            <Grid item xs={12} marginBottom={2}>
              <Button variant="outlined">Attach new option</Button><br></br>
              <Button variant="outlined">Submit</Button>
              <p>call update master filter with option json</p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <Grid container>
          <Grid item xs={12}>
            <h3>Global available options</h3>
            <SearchableList data={GlobalOptions} />
            <Grid item xs={12} marginBottom={2}>
              <Button variant="outlined">Submit</Button>
            </Grid>
            <Button variant="outlined" onClick={() => setShowAddOption(true)}>Create new option</Button>
            {showAddOption && <Grid container spacing={2} marginTop={2}>
              <Grid item xs={8}>
                <TextField id="new-option" label="New Option" variant="standard" fullWidth />
              </Grid>
              <Grid item xs={4}>
                <Button variant="outlined">Add</Button>
                <p>Put it in modal</p>
                <p>create new option and will recieve new option id</p>
              </Grid>
            </Grid>}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CreateProduct;
