import React, { useState } from "react";
import {
  Typography,
  Box,
  Checkbox,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import { FilterList } from "../../components";
import { Filter } from "../../hooks/Filter/useFiltersAvailableForProdId";

interface GlobalAvailableFilterProps {
  filters: Filter[] | null;
  // data: Filter[] | null;
  setCreateNew?: () => void;
  setGlobalFilte?: (ids: number[]) => void;
  //...

  handleFilter: (id: number, name: string) => void;
}

const GlobalAvailableFilter: React.FC<GlobalAvailableFilterProps> = ({
  filters,
  handleFilter,
  setCreateNew,
  setGlobalFilte,
}) => {
  return (
    <Grid item sm={4}>
      <h3>Globally Available Filters</h3>
      <FilterList
        filters={filters} //data
        handleFilter={handleFilter}
        // sendFilterId={getFilterId}
        setGlobalFilte={setGlobalFilte}
        setCreateNew={setCreateNew}
      />
    </Grid>
  );
};
export default GlobalAvailableFilter;
