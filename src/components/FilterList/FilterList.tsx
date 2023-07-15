import React, { useState } from "react";
import { Typography, Box, Checkbox, TextField, Grid, Button } from "@mui/material";
import { Filter } from "../../hooks/Filter/useFiltersAvailableForProdId";

interface FilterListProps {
  filters: Filter[] | null;
  sendFilterId: (id: number) => void;
}

const FilterList: React.FC<FilterListProps> = ({ filters, sendFilterId }) => {
  const [selectedFilters, setSelectedFilters] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterToggle = (filterId: number) => {
    setSelectedFilters((prevSelectedFilters) => {
      if (prevSelectedFilters.includes(filterId)) {
        return prevSelectedFilters.filter(
          (selectedFilter) => selectedFilter !== filterId
        );
      } else {
        return [...prevSelectedFilters, filterId];
      }
    });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (!term) {
      setSelectedFilters([]);
    }
  };

  const filterMatchesSearchTerm = (filter: Filter) => {
    return filter.filter_name?.toLowerCase().includes(searchTerm.toLowerCase());
  };
  
  return (
    <>
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
        fullWidth
      />
      <div style={{ maxHeight: "60vh", overflow: "auto", marginTop: "1rem" }}>
        <Box>
          {filters && filters.map((filter) =>
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
                  <Typography variant="body1" marginRight={2}>{filter.filter_name}</Typography>
                  <Button variant="text" onClick={() => sendFilterId(filter.filter_id)}>Options</Button>
                </Box>
              </Box>
            ) : null
          )}
        </Box>
      </div>
      <Grid container gap={2}>
        <Grid>
            <Button variant="outlined">Cancel</Button>
        </Grid>
        <Grid>
            <Button variant="contained">Submit</Button>
        </Grid>
      </Grid>
    </>
  );
};

export default FilterList;
