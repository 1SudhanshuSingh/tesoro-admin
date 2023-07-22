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
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import useCreateItem from "../../hooks/Product/useCreateItem";
import { useGetAllSubproduct } from "../../hooks/Subproduct/useGetAllSubProduct";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../../hooks/Category/useGetAllCategory";
import { useProducts } from "../../hooks/Product/useGetAllProdThruCatId";
import useGetSubProductById from "../../hooks/Subproduct/useGetSubProductById";

const CreateItem: React.FC = () => {
  const createItemMutation = useCreateItem();
  const navigate = useNavigate();

  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [imagePreviews, setImagePreviews] = useState<File[]>([]);
  const [itemStatus, setItemStatus] = useState<string>("");
  const [subProdFilterValues, setSubProdFilterValues] = useState([]);
  const [subProdFilterList, setSubProdFilterList] = useState([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [selectedSubProduct, setSelectedSubProduct] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");

  const { data: response } = useCategories();
  const categories = response?.jsonResponse;

  const { data: prodData } = useProducts(
    selectedCategory ? parseInt(selectedCategory) : undefined,
    0,
    1000
  );
  const productsData = prodData?.jsonResponse || [];

  const { allSubProductsData, isLoading: subproductLoading } =
    useGetAllSubproduct(Number(selectedProduct), 0, 1000);

  const { data: subProdDataById } = useGetSubProductById(
    Number(selectedSubProduct)
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const ItemData = {
      subProdId: selectedSubProduct,
      ItemSku: selectedSubProduct,
      ItemQty: Number(formData.get("ItemQty")),
      ItemActive: itemStatus,
      ItemDetail: formData.get("ItemDetail") as string,
      ItemImage: imageFiles,
      ItemPrice: Number(formData.get("ItemPrice")),
      ItemFilterValues: subProdFilterList.map((item) =>
        Number(item?.filter_id)
      ),
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
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel id="category_Dropdown">Choose Category</InputLabel>
                <Select
                  labelId="category_Dropdown"
                  id="select_category_Dropdown"
                  value={selectedCategory}
                  label="Choose Category"
                  fullWidth
                  onChange={(event) => setSelectedCategory(event.target.value)}
                >
                  {categories?.map((category) => (
                    <MenuItem
                      key={category.catID}
                      value={category.catID.toString()}
                    >
                      {category.category_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel id="product_Dropdown">Choose Product</InputLabel>
                <Select
                  labelId="product_Dropdown"
                  id="select_product_Dropdown"
                  value={selectedProduct}
                  label="Choose Product"
                  fullWidth
                  onChange={(event) => setSelectedProduct(event.target.value)}
                  disabled={!selectedCategory}
                >
                  {productsData.map((product) => (
                    <MenuItem
                      key={product.prodID}
                      value={product.prodID.toString()}
                    >
                      {product.prod_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="SubProduct_Dropdown">
                  Choose SubProduct
                </InputLabel>
                <Select
                  labelId="SubProduct_Dropdown"
                  id="select_SubProduct_Dropdown"
                  value={selectedSubProduct}
                  label="Choose SubProduct"
                  fullWidth
                  onChange={(event) =>
                    setSelectedSubProduct(event.target.value)
                  }
                >
                  {subproductLoading ? (
                    <MenuItem value="">Loading...</MenuItem>
                  ) : (
                    allSubProductsData.map((subprod) => (
                      <MenuItem key={subprod.subprodID} value={subprod.subprodID}>
                        {subprod.subprod_Name}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField label="ItemSku" name="ItemSku" fullWidth />
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
              <FormControl fullWidth>
                <InputLabel id="item-status-label">Item Status</InputLabel>
                <Select
                  labelId="item-status-label"
                  id="item-status-select"
                  value={itemStatus}
                  label="Item Status"
                  onChange={(event) => setItemStatus(event.target.value)}
                >
                  <MenuItem value="A">Active</MenuItem>
                  <MenuItem value="I">Inactive</MenuItem>
                  <MenuItem value="S">Store</MenuItem>
                </Select>
              </FormControl>
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
              {subProdDataById && subProdDataById.subprod_filterList && (
                <Autocomplete
                  multiple
                  options={subProdDataById.subprod_filterList}
                  getOptionLabel={(option: any) => option?.filter_name}
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
              {subProdDataById && subProdDataById.subprod_filterValues && (
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
