import React from "react";
import { Grid } from "@mui/material";
import { FilterList } from "../../components";
import { Filter } from "../../hooks/Filter/useFiltersAvailableForProdId";
interface AssociatedFilterProps {
  filters: Filter[] | null;
  // data: Filter[] | null;
  showOption?: boolean;
  showAttachNew?: boolean;
  newFilterHandler?: () => void;
  handleFilter: (id: number) => void;
  setAssociatedFiltr: (id: number) => void;
}
const AssociatedFilter: React.FC<AssociatedFilterProps> = ({
  filters,
  showOption,
  showAttachNew,
  newFilterHandler,
  handleFilter,
  setAssociatedFiltr,
}) => {
  return (
    <Grid item sm={4}>
      <h3>Associated Filters</h3>

      <FilterList
        showOption
        showAttachNew
        filters={filters}
        handleFilter={handleFilter}
        newFilterHandler={newFilterHandler}
        setAssociatedFiltr={setAssociatedFiltr}
      />
    </Grid>
  );
};
export default AssociatedFilter;
