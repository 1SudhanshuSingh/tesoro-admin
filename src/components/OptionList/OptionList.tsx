import React, { useState } from "react";
import {
  Typography,
  Box,
  Checkbox,
  TextField,
  Grid,
  Button,
} from "@mui/material";

import { Option } from "../../hooks/Filter/useallFilterOptionsAvailableForFilterID";

interface OptionListProps {
  options: Option[] | null;
  newOptionHandler?: () => void;
  setCreateNew?: () => void;
  showAttachNew?: boolean;
  setAssociatedFiltrOption?: (ids: number[]) => void;
  setGlobalOptin?: (ids: number[]) => void;
}

const OptionList: React.FC<OptionListProps> = ({
  options,
  newOptionHandler,
  showAttachNew,
  setCreateNew,
  setAssociatedFiltrOption,
  setGlobalOptin,
}) => {
  const [selectedOption, setSelectedOption] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // console.log("ids", ids);
  const handleSubmit = () => {
    if (setGlobalOptin && selectedOption.length > 0) {
      setGlobalOptin(selectedOption);
    }
    if (setAssociatedFiltrOption && selectedOption.length > 0) {
      setAssociatedFiltrOption(selectedOption); // Pass the first filter id as a single number argument
    }
  };

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
    return option.filter_optionName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
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
      <div
        style={{
          maxHeight: "20rem",
          overflow: "auto",
          marginTop: "1rem",
        }}
      >
        <Box>
          {options &&
            options.map((option) =>
              optionMatchesSearchTerm(option) ? (
                <Box
                  key={option.filter_optionID}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box display="flex" alignItems="center">
                    <Checkbox
                      checked={selectedOption.includes(option.filter_optionID)}
                      onChange={() =>
                        handleoptionToggle(option.filter_optionID)
                      }
                    />
                    <Typography variant="body1" marginRight={2}>
                      {option.filter_optionName}
                    </Typography>
                  </Box>
                </Box>
              ) : null
            )}
        </Box>
      </div>
      <Grid
        container
        gap={2}
        sx={{
          position: "sticky",
          bottom: "1",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          background: "#fff", // Add a background color to prevent overlap with content
          margin: "1rem auto",
        }}
      >
        <Grid>
          <Button variant="outlined">Cancel</Button>
        </Grid>
        <Grid>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
        <Grid>
          {showAttachNew ? (
            <Button variant="contained" onClick={newOptionHandler}>
              Attach New
            </Button>
          ) : (
            <Button variant="contained" onClick={setCreateNew}>
              Create New
            </Button>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default OptionList;

/*import React, { useState } from "react";
import {
  Typography,
  Box,
  Checkbox,
  TextField,
  Grid,
  Button,
} from "@mui/material";

interface Option {
  id: number;
  label: string;
}

interface OptionListProps {
  options: Option[];
  newOptionHandler?: () => void;
  setCreateNew?: () => void;
  showAttachNew?: boolean;
  setAssociatedFiltrOption?: (id: number) => void;
  setGlobalOptin?: (id: number) => void;
}

const OptionList: React.FC<OptionListProps> = ({
  options,
  newOptionHandler,
  showAttachNew,
  setCreateNew,
  setAssociatedFiltrOption,
  setGlobalOptin,
}) => {
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

  const handleSubmit = () => {
    if (setGlobalOptin && selectedOption.length > 0) {
      const [firstFilterId] = selectedOption; // Take the first filter id from the selectedOption array
      setGlobalOptin(firstFilterId); // Pass the first filter id as a single number argument
    }
    if (setAssociatedFiltrOption && selectedOption.length > 0) {
      const [firstFilterId] = selectedOption; // Take the first filter id from the selectedOption array
      setAssociatedFiltrOption(firstFilterId); // Pass the first filter id as a single number argument
    }
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
                  <Typography variant="body1" marginRight={2}>
                    {option.label}
                  </Typography>
                  <Button variant="text">Options</Button>
                </Box>
              </Box>
            ) : null
          )}
        </Box>
      </div>
      <Grid
        container
        gap={2}
        sx={{
          // position: "sticky",
          // bottom: "2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#fff", // Add a background color to prevent overlap with content
        }}
      >
        <Grid>
          <Button variant="outlined">Cancel</Button>
        </Grid>
        <Grid>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
        <Grid>
          {showAttachNew ? (
            <Button variant="contained" onClick={newOptionHandler}>
              Attach New
            </Button>
          ) : (
            <Button variant="contained" onClick={setCreateNew}>
              Create New
            </Button>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default OptionList;*/
