import React from "react";
import { Grid } from "@mui/material";
import { OptionList } from "../../components";
import { Option } from "../../hooks/Filter/useallFilterOptionsAvailableForFilterID";
interface GloballyAvailableOptionsProps {
  options: Option[] | null;
  setCreateNew?: () => void;

  setGlobalOptin: (ids: number[]) => void;
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
        options={options}
        setGlobalOptin={setGlobalOptin}
        setCreateNew={setCreateNew}
      />
    </Grid>
  );
};
export default GloballyAvailableOptions;
