import React from "react";
import { Grid } from "@mui/material";
import { OptionList } from "../../components";
interface GloballyAvailableOptionsProps {
  options: Array<{
    id: number;
    label: string;
  }>;
  setCreateNew?: () => void;
  setGlobalOptin?: (id: number) => void;
}
const GloballyAvailableOptions: React.FC<GloballyAvailableOptionsProps> = ({
  options,
  setCreateNew,
  setGlobalOptin,
}) => {
  return (
    <Grid item sm={4}>
      <h3>Globally Available Options</h3>
      <OptionList
        setGlobalOptin={setGlobalOptin}
        setCreateNew={setCreateNew}
        options={options}
      />
    </Grid>
  );
};
export default GloballyAvailableOptions;
