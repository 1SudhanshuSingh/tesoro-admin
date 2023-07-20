import React from "react";
import { Grid } from "@mui/material";
import { OptionList } from "../../components";
import { options } from "../Filter/Dummy";
interface AssociatedOptionsProps {
  options: Array<{
    id: number;
    label: string;
  }>;
  newOptionHandler?: () => void;
  showAttachNew?: boolean;
  setAssociatedFiltrOption: (id: number) => void;
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
