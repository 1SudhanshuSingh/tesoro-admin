import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
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
