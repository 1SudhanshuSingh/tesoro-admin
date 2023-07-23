import React from "react";
import { Grid } from "@mui/material";
import { OptionList } from "../../components";
import { Option } from "../../hooks/Filter/useallFilterOptionsAvailableForFilterID";
interface AssociatedOptionsProps {
  options: Option[];
  newOptionHandler?: () => void;
  showAttachNew?: boolean;
  setAssociatedFiltrOption?: (ids: number[]) => void;
}
const AssociatedOptions: React.FC<AssociatedOptionsProps> = ({
  options,
  newOptionHandler,
  showAttachNew,
  setAssociatedFiltrOption,
}) => {
  return (
    <Grid item sm={4}>
      <h3>Associated Options</h3>
      <OptionList
        options={options}
        showAttachNew
        newOptionHandler={newOptionHandler}
        setAssociatedFiltrOption={setAssociatedFiltrOption}
      />
    </Grid>
  );
};
export default AssociatedOptions;
