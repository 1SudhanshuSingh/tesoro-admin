import React from "react";
import { Grid } from "@mui/material";
import { OptionList } from "../../components";
interface GloballyAvailableOptionsProps {
  options: Array<{
    id: number;
    label: string;
  }>;
}
const GloballyAvailableOptions: React.FC<GloballyAvailableOptionsProps> = ({
  options,
}) => {
  return (
    <Grid item sm={4}>
      <h3>Globally Available Options</h3>
      <OptionList options={options} />
    </Grid>
  );
};
export default GloballyAvailableOptions;
