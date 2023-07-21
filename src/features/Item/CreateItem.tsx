import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormControl,
  TextField,
  Box,
  Grid,
  InputAdornment,
  Alert,
  Snackbar,
  Autocomplete,
  Chip,
} from "@mui/material";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import useCreateItem from "../../hooks/Product/useCreateItem";
import { useGetAllSubproduct } from "../../hooks/Subproduct/useGetAllSubProduct";
import { MenuItem } from "@material-ui/core";
import { uuid } from "short-uuid";
import { useNavigate } from "react-router-dom";
import useGetSubProductById from "../../hooks/Subproduct/useGetSubProductById";

const CreateItem: React.FC = () => {
  const createItemMutation = useCreateItem();
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [imagePreviews, setImagePreviews] = useState<File[]>([]);
  const [isItemActive, setIsItemActive] = useState<boolean>(true);
  const [subProdFilterValues, setSubProdFilterValues] = useState([]);
  const [subProdFilterList, setSubProdFilterList] = useState([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [selectedSubProduct, setSelectedSubProduct] = useState<string>("");
  const { allSubProductsData, isLoading: subproductLoading } =
    useGetAllSubproduct(0);
  const { data: subProdDataById } = useGetSubProductById(
    Number(selectedSubProduct)
  );
  const generateItemSku = (): string => {
    const encodedUUID = uuid();
    return `TS${encodedUUID}`;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const ItemData = {
      subProdId: Number(formData.get("subProdId")),
      ItemSku: generateItemSku(),
      ItemQty: Number(formData.get("ItemQty")),
      ItemActive: isItemActive ? "A" : "F",
      ItemDetail: formData.get("ItemDetail") as string,
      ItemImage: imageFiles,
      ItemPrice: Number(formData.get("ItemPrice")),
      ItemFilterValues: subProdFilterList,
    };
    createItemMutation.mutate(ItemData);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;

    if (files && files.length > 0) {
      const selectedFiles: File[] = Array.from(files);
      setImageFiles(selectedFiles);
      setImagePreviews(selectedFiles);
    } else {
      setImagePreviews([]);
    }
  };
  useEffect(() => {
    if (createItemMutation.isSuccess) {
      setOpenSnackbar(true);
    }
  }, [createItemMutation.isSuccess]);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
    navigate("/item");
  };

  const handleDeleteFilter = (index: number) => {
    const updatedFilters = [...subProdFilterList];
    updatedFilters.splice(index, 1);
    setSubProdFilterList(updatedFilters);
  };

  const handleDeleteFilterValue = (index: number) => {
    const updatedFilterValues = [...subProdFilterValues];
    updatedFilterValues.splice(index, 1);
    setSubProdFilterValues(updatedFilterValues);
  };

  return (
    <div>
      <h3>Create Item</h3>
      <form onSubmit={handleSubmit}>
        <FormControl style={{ margin: "20px" }} focused>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Choose Subproduct"
                name="subProdId"
                type="number"
                fullWidth
                select
                value={selectedSubProduct}
                onChange={(event) => setSelectedSubProduct(event.target.value)}
              >
                {subproductLoading ? (
                  <MenuItem value="">Loading...</MenuItem>
                ) : (
                  allSubProductsData?.map((subprod) => (
                    <MenuItem key={subprod.subprodID} value={subprod.subprodID}>
                      {subprod.subprod_Name}
                    </MenuItem>
                  ))
                )}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="ItemSku"
                name="ItemSku"
                disabled
                value={generateItemSku()}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="ItemQty"
                name="ItemQty"
                type="number"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Item Detail"
                name="ItemDetail"
                multiline
                rows={6}
                fullWidth
                variant="outlined"
                placeholder="Enter item details..."
              />
            </Grid>
            <Grid item xs={12}>
              <label htmlFor="ItemImage">
                <Button variant="contained" component="span">
                  <AddPhotoAlternateRoundedIcon sx={{ mr: 1, my: 0.5 }} />
                  Choose Item Image
                </Button>
                <input
                  accept="image/*"
                  type="file"
                  id="ItemImage"
                  name="ItemImage"
                  placeholder="choose Item"
                  multiple
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </label>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: imagePreviews.length ? "flex" : "none",
                  flexWrap: "wrap",
                  alignItems: "flex-end",
                  border: "1px dashed rgb(25, 118, 210)",
                  columnWidth: "fit-content",
                }}
              >
                {imagePreviews.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`Item Preview ${index + 1}`}
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "10%",
                      margin: "5px",
                    }}
                  />
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="ItemActive"
                    color="primary"
                    checked={isItemActive}
                    onChange={(e) => setIsItemActive(e.target.checked)}
                  />
                }
                label={isItemActive ? "Active" : "Inactive"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Item Price"
                name="ItemPrice"
                type="number"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CurrencyRupeeRoundedIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              {subProdDataById && (
                <Autocomplete
                  multiple
                  options={subProdDataById.subprod_filterList}
                  getOptionLabel={(option) => option.filter_name}
                  value={subProdFilterList}
                  onChange={(event, newValue) => setSubProdFilterList(newValue)}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option.filter_name}
                        {...getTagProps({ index })}
                        onDelete={() => handleDeleteFilter(index)}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Item Filter List" />
                  )}
                />
              )}
            </Grid>
            <Grid item xs={6}>
              {subProdDataById && (
                <Autocomplete
                  multiple
                  options={subProdDataById.subprod_filterValues}
                  getOptionLabel={(option) => option.filter_optionName}
                  value={subProdFilterValues}
                  onChange={(event, newValue) =>
                    setSubProdFilterValues(newValue)
                  }
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option.filter_optionName}
                        {...getTagProps({ index })}
                        onDelete={() => handleDeleteFilterValue(index)}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Item Filter Values" />
                  )}
                />
              )}
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            marginTop={2}
            display="flex"
            justifyContent="flex-end"
          >
            <Button type="submit" variant="contained" color="primary">
              Create
            </Button>
          </Grid>
        </FormControl>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          Item has been created!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CreateItem;
