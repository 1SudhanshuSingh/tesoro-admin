import React, { useState } from "react";
import {
  FormControl,
  TextField,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Chip,
  Card,
  CardMedia,
  Typography,
} from "@mui/material";
import useCreateSubProduct from "../../hooks/Product/useCreateSubProduct";
import { useCategories } from "../../hooks/Category/useGetAllCategory";
import { useProducts } from "../../hooks/Product/useGetAllProdThruCatId";
import useFiltersAvailableForProdId from "../../hooks/Filter/useFiltersAvailableForProdId";

const CreateSubProduct: React.FC = () => {
  const createSubProductMutation = useCreateSubProduct();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<number[]>([]);
  const [itemStatus, setItemStatus] = useState<string>("");

  const { filterData } = useFiltersAvailableForProdId(0);
  console.log(filterData);
  const { data: response } = useCategories();
  const categories = response?.jsonResponse;

  const { data: prodData } = useProducts(
    selectedCategory ? parseInt(selectedCategory) : undefined,
    0,
    1000
  );
  const productsData = prodData?.jsonResponse || [];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const SubProductData = {
      ProdID: (formData.get("ProdId") as string).split(","),
      FilterValues: (formData.get("FilterValues") as string).split(","),
      Name: formData.get("Name") as string,
      Active: Boolean(formData.get("Active")),
      FilterList: (formData.get("FilterList") as string).split(","),
      Image: selectedImage || null,
    };

    console.log("data :", SubProductData);
    createSubProductMutation.mutate(SubProductData);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const previewUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result;
          if (typeof result === "string") {
            previewUrls.push(result);
            if (previewUrls.length === files.length) {
              setImagePreviews(previewUrls);
            }
          }
        };
        reader.readAsDataURL(file);
      }
    } else {
      setImagePreviews([]);
    }
  };

  const handleProductChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const { value } = event.target;
    if (Array.isArray(value)) {
      setSelectedProduct(value as number[]);
    }
  };
  const getProductNameById = (productId: number): string => {
    return (
      productsData.find((product) => product.prodID === productId)?.prod_name ||
      ""
    );
  };
  return (
    <div>
      <h3>Create SubProduct</h3>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
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
              <Grid item marginTop={2}>
                <TextField label="Subproduct Name" name="Name" fullWidth />
              </Grid>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="product_Dropdown">Choose Product</InputLabel>
              <Select
                labelId="product_Dropdown"
                id="select_product_Dropdown"
                multiple // Enable multiple selection
                value={selectedProduct}
                label="Choose Product"
                fullWidth
                onChange={handleProductChange}
                disabled={!selectedCategory}
                renderValue={(selected) => (
                  <div>
                    {selected.map((value) => (
                      <Chip key={value} label={getProductNameById(value)} />
                    ))}
                  </div>
                )}
              >
                {productsData.map((product) => (
                  <MenuItem key={product.prodID} value={product.prodID}>
                    {product.prod_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} marginTop={2} alignItems="center">
          <Grid item xs={12}>
            <label htmlFor="SubProductImage">
              <Button variant="contained" component="span">
                Choose Image
              </Button>
              <input
                accept="image/*"
                type="file"
                id="SubProductImage"
                name="SubProductImage"
                placeholder="Choose Images"
                onChange={handleImageChange}
                style={{ display: "none" }}
                multiple
              />
            </label>
          </Grid>
          {imagePreviews.map((previewUrl, index) => (
            <Grid item key={index}>
              <div style={{ marginTop: 16 }}>
                <Card>
                  <CardMedia
                    component="img"
                    src={previewUrl}
                    alt={`SubProduct Preview ${index + 1}`}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: "10%",
                    }}
                  />
                </Card>
                <Typography variant="body1">{`Preview ${
                  index + 1
                }`}</Typography>
              </div>
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12} sm={6} marginY={2}>
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
        <TextField label="FilterList" name="FilterList" />
        <Button type="submit" variant="contained" color="primary">
          Create
        </Button>
      </form>
    </div>
  );
};

export default CreateSubProduct;
