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
  setGlobalFilte: (id: number) => void;
  handleFilter: (id: number) => void;
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

      {/* <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
        fullWidth
      />
      <div style={{ maxHeight: "60vh", overflow: "auto", marginTop: "1rem" }}>
        <Box>
          {filters &&
            filters.map((filter) =>
              filterMatchesSearchTerm(filter) ? (
                <Box
                  key={filter.filter_id}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box display="flex" alignItems="center">
                    <Checkbox
                      checked={selectedFilters.includes(filter.filter_id)}
                      onChange={() => handleFilterToggle(filter.filter_id)}
                    />
                    {showOption ? (
                      <Button
                        variant="text"
                        onClick={() => {
                          console.log("handle");
                          return handleFilter(filter.filter_id);
                        }}
                      >
                        {filter.filter_name}
                      </Button>
                    ) : (
                      <Typography>{filter.filter_name}</Typography>
                    )}
                  </Box>
                </Box>
              ) : null
            )}
        </Box>
      </div>
      <Grid container gap={2} marginTop={2}>
        <Grid>
          <Button variant="outlined">Cancel</Button>
        </Grid>
        <Grid>
          <Button variant="contained" onClick={}>
            Submit
          </Button>
        </Grid>
        <Grid>
          {showAttachNew ? (
            <Button variant="contained" onClick={newFilterHandler}>
              Attach New
            </Button>
          ) : (
            <Button variant="contained" onClick={setCreateNew}>
              Create New
            </Button>
          )}
        </Grid>
      </Grid> */}
    </Grid>
  );
};
export default GlobalAvailableFilter;
