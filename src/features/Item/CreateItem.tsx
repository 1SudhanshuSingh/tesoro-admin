import React, { useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormControl,
  TextField,
  Box,
  Grid,
  InputAdornment,
} from "@mui/material";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import useCreateItem from "../../hooks/Product/useCreateItem";

const CreateItem: React.FC = () => {
  const createItemMutation = useCreateItem();
  const [imagePreviews, setImagePreviews] = useState<File[]>([]);
  // const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const ItemData = {
      subProdId: Number(formData.get("subProdId")),
      ItemSku: formData.get("ItemSku") as string,
      ItemQty: Number(formData.get("ItemQty")),
      ItemActive: Boolean(formData.get("ItemActive")),
      ItemDetail: formData.get("ItemDetail") as string,
      // ItemImage: formData.get("ItemImage") as unknown as FileList,
      ItemImage: imageFiles,
      ItemPrice: Number(formData.get("ItemPrice")),
      ItemFilterValues: (formData.get("ItemFilterValues") as string).split(","),
    };
    console.log("data :", ItemData);
    createItemMutation.mutate(ItemData);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;

    if (files && files.length > 0) {
      const selectedFiles: File[] = Array.from(files);
      console.log("selectedFiles:", selectedFiles);
      setImageFiles(selectedFiles);
      setImagePreviews(selectedFiles);
    } else {
      setImagePreviews([]);
    }
  };

  return (
    <div>
      <h3>Create Item</h3>
      <form onSubmit={handleSubmit}>
        <FormControl
          style={{ display: "flex", gap: "10px", margin: "20px" }}
          focused
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Sub ProdId"
                name="subProdId"
                type="number"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="ItemSku" name="ItemSku" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="ItemQty"
                name="ItemQty"
                type="number"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Item Detail"
                name="ItemDetail"
                multiline
                fullWidth
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
                control={<Checkbox name="ItemActive" color="primary" />}
                label="Item Active"
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
            <Grid item xs={12}>
              <TextField label="Item Filter List" name="ItemFilterValues" />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary">
            Create
          </Button>
        </FormControl>
      </form>
    </div>
  );
};

export default CreateItem;
