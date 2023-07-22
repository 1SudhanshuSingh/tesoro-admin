import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import { Grid, Typography } from "@mui/material";

interface Filter {
  filter_id: number;
  filter_name: string;
  row: number;
}

interface Option {
  filter_optionID: number;
  filter_optionName: string;
  row: number;
}

type ChipData = Filter | Option;

interface ChipProps {
  title: string;
  data: ChipData[] | null;
}

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const ChipsArray: React.FC<ChipProps> = ({ title, data }) => {
  const [chipData, setChipData] = useState<ChipData[]>([]);

  useEffect(() => {
    if (data?.length) {
      setChipData(data);
    }
  }, [data]);

  const handleDelete = (chipToDelete: ChipData) => () => {
    setChipData((chips) =>
      chips.filter((chip) =>
        isFilter(chip) && isFilter(chipToDelete)
          ? chip.filter_id !== chipToDelete.filter_id
          : isOption(chip) && isOption(chipToDelete)
          ? chip.filter_optionID !== chipToDelete.filter_optionID
          : true
      )
    );
  };

  const isFilter = (item: ChipData): item is Filter => "filter_id" in item;

  const isOption = (item: ChipData): item is Option =>
    "filter_optionID" in item;

  return (
    <>
      <Typography marginBottom={2}>{title}</Typography>
      <Grid item sm={12}>
        <Paper
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            listStyle: "none",
            p: 0.5,
            m: 0,
          }}
          component="ul"
        >
          {chipData.map((data) => {
            return (
              <ListItem
                key={isFilter(data) ? data.filter_id : data.filter_optionID}
              >
                <Chip
                  label={
                    isFilter(data) ? data.filter_name : data.filter_optionName
                  }
                  onDelete={handleDelete(data)}
                />
              </ListItem>
            );
          })}
        </Paper>
      </Grid>
    </>
  );
};

export default ChipsArray;

/*
import Paper from "@mui/material/Paper";
import { Grid, Typography } from "@mui/material";
import { Filter } from "../../hooks/Filter/useFiltersAvailableForProdId";


interface ChipProps {
  title: string;
  data: Filter[] | null;
}
const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const ChipsArray: React.FC<ChipProps> = ({ title, data }) => {
  const [chipData, setChipData] = useState<readonly Filter[]>([]);

  useEffect(() => {
    if(data?.length){
      setChipData(data);
    }
  }, [data]);
  const handleDelete = (chipToDelete: Filter) => () => {
    setChipData((chips) => chips.filter((chip) => chip.filter_id !== chipToDelete.filter_id));
  };

  return (
    <>
      <Typography marginBottom={2}>
        {title}
      </Typography>
      <Grid item sm={12}>
        <Paper
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            listStyle: "none",
            p: 0.5,
            m: 0,
          }}
          component="ul"
        >
          {chipData.map((data) => {
            return (
              <ListItem key={data.filter_id}>
                <Chip
                  label={data.filter_name}
                  onDelete={handleDelete(data)}
                />
              </ListItem>
            );
          })}
        </Paper>
      </Grid>
    </>
  );
};

export default ChipsArray;
*/
