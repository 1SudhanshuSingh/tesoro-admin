import React, { useState } from "react";
import { Typography, Box, Checkbox, TextField, Grid, Button } from "@mui/material";

interface Option {
  id: number;
  label: string;
}

interface OptionListProps {
  options: Option[];
}

const OptionList: React.FC<OptionListProps> = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleoptionToggle = (optionId: number) => {
    setSelectedOption((prevSelectedOptions) => {
      if (prevSelectedOptions.includes(optionId)) {
        return prevSelectedOptions.filter(
          (selectedOption) => selectedOption !== optionId
        );
      } else {
        return [...prevSelectedOptions, optionId];
      }
    });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (!term) {
      setSelectedOption([]);
    }
  };

  const optionMatchesSearchTerm = (option: Option) => {
    return option.label.toLowerCase().includes(searchTerm.toLowerCase());
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
          {options.map((option) =>
            optionMatchesSearchTerm(option) ? (
              <Box
                key={option.id}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box display="flex" alignItems="center">
                  <Checkbox
                    checked={selectedOption.includes(option.id)}
                    onChange={() => handleoptionToggle(option.id)}
                  />
                  <Typography variant="body1" marginRight={2}>{option.label}</Typography>
                  <Button variant="text">Options</Button>
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

export default OptionList;
