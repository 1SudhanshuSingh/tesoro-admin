import React, { useState, useEffect } from "react";
import {
  Button,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  FormControl,
} from "@mui/material";
import { ChipsArray, MultipleSelectChip } from "../../components";
// import useCreateProduct from "../../hooks/Product/useCreateProduct";
import { OptionData } from "./Dummy";
import FilterModal from "./components/FiltersModal";
import OptionModal from "./components/OptionModal";
import useFiltersAvailableForProdId, {
  Filter,
} from "../../hooks/Filter/useFiltersAvailableForProdId";
// import useFiltersAvailableForProdId, {
//   Option,
// } from "../../hooks/Filter/useFiltersAvailableForProdId";
import useCreateMasterFilter from "../../hooks/Filter/useCreateMasterFilter";
import useCreateMasterOption from "../../hooks/Filter/useCreateMasterOption";

const CreateProduct: React.FC = () => {
  const [prodId, setProdId] = useState<number>(0);
  const { isLoading, filterData, refetch } =
    useFiltersAvailableForProdId(prodId);
  const { createMasterFilter, data: createdDataRes } = useCreateMasterFilter();
  //options
  //  const {  OptionData, } =
  //    useFiltersAvailableForProdId(prodId);
  const { createMasterOption } = useCreateMasterOption();

  const [activeOption, setActiveOption] = useState<string>("");
  const [showAttachNewFilter, setShowAttachNewFilter] =
    useState<boolean>(false);
  const [showAttachOption, setShowAttachOption] = useState<boolean>(false);
  const [filterId, setFilterId] = useState<number>(0);
  const getFilterId = (id: number) => {
    if (id) {
      setFilterId(id);
      setShowAttachOption(true);
      setShowAttachNewFilter(false);
    }
    console.log(id);
  };
  const handleBackToFilter = () => {
    setShowAttachOption(false);
    setShowAttachNewFilter(true);
  };
  const handleOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setActiveOption(event.target.value);
  };
  const handleCreateFilter = async (filterName: string) => {
    await createMasterFilter({
      filterName,
      filterOptions: "[]",
    });
    await refetch();
  };
  // const handleCreateOption = async (OptionName: string) => {
  //   await createMasterOption({ //change api here
  //     OptionName,
  //     OptionOptions: "[]",
  //   });
  //   await refetch();
  // };
  const handleCreateOption = async (OptionName: string) => {
    await createMasterOption({
      //change api here
      OptionName,
      OptionOptions: "[]",
    });
    await refetch();
  };

  /* ------------------------------- for filters ------------------------------ */
  const [Chipdata, setChipdata] = useState<Filter[]>([]);
  const [AssociatedFilters, setAssociatedFilters] = useState<number[]>([]);
  const setAssociatedFiltr = (id: number) => {
    setAssociatedFilters((prevNumbers) => {
      if (!AssociatedFilters.includes(id)) {
        return [...prevNumbers, id];
      }
      return prevNumbers;
    });
  };

  useEffect(() => {
    const dta =
      filterData?.filter((item) => {
        return AssociatedFilters.includes(item.filter_id);
      }) || [];
    setChipdata(dta);
    console.log("dta", Chipdata);
    console.log("manage filter chips", AssociatedFilters);
  }, [AssociatedFilters]);

  /* ------------------------------ FilterOPtion ------------------------------ */
  const [OptionChipdata, setOptionChipdata] = useState<Filter[]>([]);
  const [AssociatedFilterOptions, setAssociatedFilterOptions] = useState<
    number[]
  >([]);
  const setAssociatedFiltrOption = (id: number) => {
    setAssociatedFilterOptions((prevNumbers) => {
      if (!AssociatedFilterOptions.includes(id)) {
        return [...prevNumbers, id];
      }
      return prevNumbers;
    });
  };

  useEffect(() => {
    const dta =
      filterData?.filter((item) => {
        return AssociatedFilterOptions.includes(item.filter_id);
      }) || [];
    setOptionChipdata(dta);
    console.log("dta", OptionChipdata);
    console.log("manage filter chips", AssociatedFilterOptions);
  }, [AssociatedFilterOptions]);
  /* filter options end  */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.target);
  };

  return (
    <>
      <h3>Create Product</h3>
      <form onSubmit={handleSubmit}>
        <FormControl
          style={{ display: "flex", gap: "10px", margin: "20px" }}
          focused
        >
          <Grid container gap={2}>
            <Grid item xs={6}>
              <MultipleSelectChip
                title="Category"
                data={["cat1", "cat2", "cat3"]}
              />
              <Grid padding={1} marginTop={2}>
                <TextField label="Product Name" fullWidth />
              </Grid>
              <Grid padding={1} marginTop={2}>
                <TextField
                  label="Text Area"
                  multiline
                  fullWidth
                  rows={4}
                  variant="filled"
                />
              </Grid>
              <Grid container marginTop={2} gap={2}>
                <Grid item sm={2}>
                  <Typography>Active</Typography>
                </Grid>
                <Grid item sm={6}>
                  <RadioGroup
                    aria-label="active"
                    name="active"
                    value={activeOption}
                    onChange={handleOptionChange}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </Grid>
                <Grid item sm={2}>
                  <Button variant="outlined">Store Only</Button>
                </Grid>
              </Grid>
              <Grid padding={1} marginTop={2}>
                <TextField label="Product Sequence" fullWidth />
              </Grid>
              {/* filters */}
              <Grid container marginTop={2}>
                <ChipsArray title="Filters" data={Chipdata} />
                {/* <ChipsArray title="Filter Options" data={OptionChipdata} /> */}
              </Grid>

              <Grid container marginY={2}>
                <Button
                  variant="outlined"
                  onClick={() => setShowAttachNewFilter(true)}
                >
                  Manage Filters
                </Button>
              </Grid>

              {/* filterend */}
              <Grid container marginY={2}>
                <Button type="submit" variant="contained" color="primary">
                  Create
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <FilterModal
            prodId={prodId}
            data={filterData}
            show={showAttachNewFilter}
            handleShow={setShowAttachNewFilter}
            getFilterId={getFilterId}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            handleCreateFilter={handleCreateFilter}
            setAssociatedFiltr={setAssociatedFiltr}
          />
          <OptionModal
            data={OptionData}
            // show={true}
            show={showAttachOption}
            handleShow={setShowAttachOption}
            handleBackToFilter={handleBackToFilter}
            handleCreateOption={handleCreateOption}
            setAssociatedFiltrOption={setAssociatedFiltrOption}
          />
        </FormControl>
      </form>
    </>
  );
};

export default CreateProduct;
