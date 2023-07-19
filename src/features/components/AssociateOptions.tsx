import React from "react";
import { Grid } from "@mui/material";
import { OptionList } from "../../components";
import { options } from "../Filter/Dummy";
interface AssociatedOptionsProps {
  options: Array<{
    id: number;
    label: string;
  }>;
  
}
const AssociatedOptions: React.FC<AssociatedOptionsProps> = ({ options }) => {
  return (
    <Grid item sm={4}>
      <h3>Associated Options</h3>
      <OptionList options={options} />
    </Grid>
  );
};
export default AssociatedOptions;
