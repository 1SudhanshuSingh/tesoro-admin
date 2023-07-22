import { useState } from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface Option {
  id: number;
  label: string;
}

interface SelectChipProps {
  data: Option[];
  title: string;
  multiple: boolean;
  idFunc?: (ids: number | number[]) => void;
}

function getStyles(name: string, selectedNames: string[], theme: Theme) {
  return {
    fontWeight: selectedNames.includes(name)
      ? theme.typography.fontWeightMedium
      : undefined,
  };
}

const SelectChip: React.FC<SelectChipProps> = ({
  data,
  title,
  multiple,
  idFunc,
}) => {
  const theme = useTheme();
  const [selectedNames, setSelectedNames] = useState<string[]>([]); // New state to hold selected names
  const [selectedIds, setSelectedIds] = useState<number[] | number>([]); // New state to hold selected IDs

  const handleChange = (event: SelectChangeEvent<typeof selectedNames>) => {
    const {
      target: { value },
    } = event;

    // Update selectedNames
    setSelectedNames(multiple ? (value as string[]) : ([value] as string[]));

    // Update selectedIds
    const selectedIdsArray = data
      .filter((item) =>
        multiple ? value.includes(item.label) : item.label === value
      )
      .map((item) => item.id);

    setSelectedIds(
      multiple
        ? (selectedIdsArray as number[])
        : (selectedIdsArray[0] as number)
    );

    // Call the idFunc callback if provided
    if (idFunc) {
      idFunc(multiple ? selectedIdsArray : selectedIdsArray[0]);
    }
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: "100%" }}>
        <InputLabel id="chip-label">{title}</InputLabel>
        <Select
          labelId="chip-label"
          id="chip"
          multiple={multiple}
          value={selectedNames}
          onChange={handleChange}
          input={<OutlinedInput id="select-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {(selected as string[]).map((value, index) => (
                <Chip key={index} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {data.map((data, index) => {
            const name = data.label;
            return (
              <MenuItem
                key={index}
                value={name}
                style={getStyles(name, selectedNames, theme)}
              >
                {name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectChip;
/*import { useState } from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface MultipleSelectChipProps {
    data: string[],
    title: string,
}
function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const MultipleSelectChip:React.FC<MultipleSelectChipProps> = ({ data, title }) => {
  const theme = useTheme();
  const [personName, setPersonName] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: '100%' }}>
        <InputLabel id="multiple-chip-label">{title}</InputLabel>
        <Select
          labelId="multiple-chip-label"
          id="multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {data.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
export default MultipleSelectChip;*/
