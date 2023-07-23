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
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import { ChipsArray, MultipleSelectChip } from "../../components";
// import useCreateProduct from "../../hooks/Product/useCreateProduct";
// import { OptionData } from "./Dummy";
import FilterModal from "./components/FiltersModal";
import OptionModal from "./components/OptionModal";
import useFilterOptionsAvailableForFilterID, {
  Option,
} from "../../hooks/Filter/useallFilterOptionsAvailableForFilterID";
import useFiltersAvailableForProdId, {
  Filter,
} from "../../hooks/Filter/useFiltersAvailableForProdId";
import useUpdateMasterFilterOrOption, {
  Master,
} from "../../hooks/Filter/useUpdateMasterFilterOrOption";
// import useFiltersAvailableForProdId, {
//   Option,
// } from "../../hooks/Filter/useFiltersAvailableForProdId";
import useCreateMasterFilter from "../../hooks/Filter/useCreateMasterFilter";
import useCreateFilterOption from "../../hooks/Filter/useCreateFilterOption";
import {
  useCategories,
  Category,
} from "../../hooks/Category/useGetAllCategory";

import useCreateProduct from "../../hooks/Product/useCreateProduct";

// interface Option {
//   id: number;
//   label: string;
// }

const CreateProduct: React.FC = () => {
  const [prodId, setProdId] = useState<number>(0);
  const [catID, setcatID] = useState<number>(0);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const { data: response, error } = useCategories();

  // const categories = response?.[0].jsonResponse || [];

  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    // Once the response is available, update the categories state
    if (response?.jsonResponse) {
      setCategories(response.jsonResponse);
    }
  }, [response]);

  // const { CategoryListData, error } = useCategories();

  const { createMasterFilter, data: createdDataRes } = useCreateMasterFilter();
  const {
    isLoading,
    filterData,
    refetch: filterDataRefetch,
  } = useFiltersAvailableForProdId(prodId);

  const [filterDataState, setfilterDataState] = useState<Filter[] | null>([]);
  useEffect(() => {
    setfilterDataState(filterData);
  }, [filterData]);

  //selectfilterId for option
  const [filterId, setFilterId] = useState<number>(0);
  const [filterName, setFilterName] = useState("");
  const {
    OptionData,
    isLoading: filterOptionsLoading,
    refetch: filterOptionsRefetch,
  } = useFilterOptionsAvailableForFilterID(filterId ? filterId : 1);
  const [filterOptionDataState, setfilterOptionDataState] = useState<
    Option[] | null
  >([]);
  useEffect(() => {
    setfilterOptionDataState(OptionData);
  }, [filterData]);

  const { createFilterOption } = useCreateFilterOption();

  const [activeOption, setActiveOption] = useState<string>("");
  const [showAttachNewFilter, setShowAttachNewFilter] =
    useState<boolean>(false);
  const [showAttachOption, setShowAttachOption] = useState<boolean>(false);

  const getFilterId = (id: number, name: string) => {
    if (id) {
      setFilterId(id);
      setFilterName(name);
      setShowAttachOption(true);
      setShowAttachNewFilter(false);
    }
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
    await filterDataRefetch();

    await createMasterFilter({
      filterName,
      filterOptions: "[]",
    });

    console.log("succes");
  };

  const handleCreateOption = async (optionName: string) => {
    await createFilterOption({
      optionName,
    });
    await filterOptionsRefetch();
    console.log("succes form option");
  };
  /* ------------------------------------ x ----------------------------------- */
  //filter passed to associtiate from global
  const [globalFilter, setGlobalFilter] = useState<number[]>([]);
  const [selectedGlobalFilter, SetselectedGlobalFilter] = useState<Filter[]>(
    []
  );
  console.log("filter passed to associtiate", globalFilter);
  const setGlobalFilte = (ids: number[]) => {
    setGlobalFilter((prevNumbers) => {
      const uniqueIds = new Set([...prevNumbers, ...ids]);
      return Array.from(uniqueIds);
    });
  };

  useEffect(() => {
    SetselectedGlobalFilter(
      () =>
        filterDataState?.filter((item) => {
          return globalFilter.includes(item.filter_id);
        }) || []
    );
  }, [globalFilter]);
  /* ------------------------------- for filters ------------------------------ */
  const [Chipdata, setChipdata] = useState<Filter[]>([]);
  const [AssociatedFilters, setAssociatedFilters] = useState<number[]>([]);

  const setAssociatedFiltr = (ids: number[]) => {
    setAssociatedFilters((prevNumbers) => {
      // Filter out duplicate IDs before adding them to the state
      const newIds = ids.filter((id) => !prevNumbers.includes(id));
      return [...prevNumbers, ...newIds];
    });
  };

  useEffect(() => {
    const dta =
      filterDataState?.filter((item) =>
        AssociatedFilters.includes(item.filter_id)
      ) || [];
    setChipdata(dta);
  }, [AssociatedFilters]);

  /* ------------------------------ FilterOPtion ------------------------------ */
  const [OptionChipdata, setOptionChipdata] = useState<Option[]>([]);
  const [AssociatedFilterOptions, setAssociatedFilterOptions] = useState<
    number[]
  >([]);
  const setAssociatedFiltrOption = (ids: number[]) => {
    setAssociatedFilterOptions((prevNumbers) => {
      const newIds = ids.filter((id) => !prevNumbers.includes(id));
      return [...prevNumbers, ...newIds];
    });
  };

  useEffect(() => {
    const optiondta =
      OptionData?.filter((item: any) => {
        return AssociatedFilterOptions.includes(item.filter_optionID);
      }) || [];
    console.log("optiondta", optiondta);
    setOptionChipdata(optiondta);
  }, [AssociatedFilterOptions]);

  //update Option
  const [flag, setFlag] = useState<boolean | "" | 0>(false);

  const filterOption = OptionChipdata.map((option) => option?.filter_optionID);
  const { refetch: RefetchUpdate } = useUpdateMasterFilterOrOption(
    flag
      ? { filterId, filterName, filterOption }
      : { filterId: null, filterName: null, filterOption: [] }
  );

  useEffect(() => {
    setFlag(
      !!filterId && !!filterName && OptionChipdata && OptionChipdata.length > 0
    );
    if (flag) RefetchUpdate();
  }, [filterId, filterName, OptionChipdata]);

  /* ------------------------------ handleSubmit ------------------------------ */
  const createProductMutation = useCreateProduct();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const ProductData = {
      //  categoryId: catIdList[0],
      categoryId: catIdList as number,
      productName: formData.get("ProductName") as string,
      productDescription: formData.get("ProductDescription") as string,
      productImage: selectedImage || null,
      productActive: Boolean(formData.get("Active")),
      productSequence: Number(formData.get("ProductSequence")),

      productFilterList: AssociatedFilters,
    };

    createProductMutation.mutate(ProductData);
  };

  /* ------------------------------------ x ----------------------------------- */

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;

    if (files && files.length > 0) {
      const selectedFile = files[0];
      setSelectedImage(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setSelectedImage(null);
      setImagePreview(null);
    }
  };

  const [catIdList, setcatIdList] = useState<number[] | number>([]);
  const catIdListFunc = (ids: number[] | number) => {
    setcatIdList(ids);
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
                data={
                  categories?.map((data, index) => ({
                    key: { index },
                    id: data.categoryID,
                    label: data.cat_name,
                  })) ?? []
                }
                idFunc={catIdListFunc}
                multiple={false}
              />
              <Grid padding={1} marginTop={2}>
                <TextField label="Product Name" fullWidth name="ProductName" />
              </Grid>
              <Grid padding={1} marginTop={2}>
                <TextField
                  label="Product Description"
                  multiline
                  fullWidth
                  rows={4}
                  variant="filled"
                  name="ProductDescription"
                />
              </Grid>

              <label htmlFor="ProductImage">
                <Button variant="contained" component="span">
                  <AddPhotoAlternateRoundedIcon sx={{ mr: 1, my: 0.5 }} />
                  Choose Product Image
                </Button>
                <input
                  accept="image/*"
                  type="file"
                  id="ProductImage"
                  name="ProductImage"
                  placeholder="Choose Product"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </label>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Product Preview"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "10%",
                  }}
                />
              )}

              <Grid container marginTop={2} gap={2}>
                <Grid item sm={2}>
                  <Typography>Active</Typography>
                </Grid>
                <Grid item sm={6}>
                  <RadioGroup
                    aria-label="active"
                    name="Active"
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
                <TextField
                  label="Product Sequence"
                  fullWidth
                  name="ProductSequence"
                />
              </Grid>
              {/* filters */}
              <Grid container marginTop={2}>
                <ChipsArray title="Filters" data={Chipdata} />
              </Grid>
              <Grid container marginTop={2}>
                <ChipsArray title="Filters Values" data={OptionChipdata} />
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
            data={filterDataState}
            show={showAttachNewFilter}
            handleShow={setShowAttachNewFilter}
            getFilterId={getFilterId}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            handleCreateFilter={handleCreateFilter}
            setGlobalFilte={setGlobalFilte}
            setAssociatedFiltr={setAssociatedFiltr}
            selectedGlobalFilter={selectedGlobalFilter}
          />
          <OptionModal
            data={filterOptionDataState}
            // show={true}
            show={showAttachOption}
            handleShow={setShowAttachOption}
            handleBackToFilter={handleBackToFilter}
            handleCreateOption={handleCreateOption}
            setAssociatedFiltrOption={setAssociatedFiltrOption}
            setAssociatedFiltr={setAssociatedFiltr}
            // setGlobalFilte={setGlobalFilte}
            selectedGlobalFilter={selectedGlobalFilter}
            getFilterId={getFilterId}
          />
        </FormControl>
      </form>
    </>
  );
};

export default CreateProduct;
