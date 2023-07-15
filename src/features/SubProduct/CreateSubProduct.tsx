import React from "react";
import { useState } from "react";
import { Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from "yup";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Grid,
} from "@mui/material";
import useCreateSubProduct from "../../hooks/Product/useCreateSubProduct";

const validationSchema = Yup.object().shape({
  categoryId: Yup.number().required("Category is required"),
  productName: Yup.string().required("Product name is required"),
  productDescription: Yup.string().required("Product description is required"),
  productImage: Yup.mixed().required("Product image is required"), //check
  productActive: Yup.boolean().required("Product active status is required"),
  productSequence: Yup.number().required("Product sequence is required"),
  productFilterlist: Yup.string().required("Product filter list is required"), //check
});

const CreateSubProduct: React.FC = () => {
  const createSubProductMutation = useCreateSubProduct();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const handleSubmit = (values: any) => {
    console.log(values);
    createSubProductMutation.mutate(values);
  };

  return (
    <div>
      <h3>Create SubProduct</h3>
      <Formik
        initialValues={{
          categoryId: "",
          productName: "",
          productDescription: "",
          productImage: null,
          productActive: false,
          productSequence: 0,
          productFilterlist: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form style={{ gap: "10px" }}>
            <div>
              <Field
                as={TextField}
                type="text"
                id="categoryId"
                name="categoryId"
                label="Category"
              />
            </div>

            <div>
              <Field
                as={TextField}
                type="text"
                id="productName"
                name="productName"
                label="Product Name"
              />
            </div>

            <div>
              <Field
                as={TextField}
                type="text"
                id="productDescription"
                name="productDescription"
                label="Product Description"
              />
            </div>

            <div>
              <Grid
                item
                xs={12}
                sm={6}
                style={{ display: "flex", alignItems: "center" }}
                component="div"
              >
                <label htmlFor="productImage">
                  <Button variant="contained" component="span">
                    Choose Product
                  </Button>
                  <input
                    accept="image/*"
                    type="file"
                    id="productImage"
                    name="productImage"
                    placeholder="choose Product"
                    onChange={(event) => {
                      const file =
                        event.currentTarget.files &&
                        event.currentTarget.files[0];
                      setFieldValue("productImage", file);
                      console.log("file:", file);
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setImagePreview(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      } else {
                        setImagePreview(null);
                      }
                    }}
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
                <ErrorMessage
                  name="productImage"
                  component="div"
                  className="error"
                />
              </Grid>
            </div>

            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    id="productActive"
                    name="productActive"
                    color="primary"
                    checked={values.productActive}
                    onChange={(event) => {
                      setFieldValue("productActive", event.target.checked);
                    }}
                  />
                }
                label="Active"
              />
              <ErrorMessage
                name="productActive"
                component="div"
                className="error"
              />
            </div>

            <div>
              <Field
                as={TextField}
                type="number"
                id="productSequence"
                name="productSequence"
                label="Product Sequence"
              />
            </div>

            <div>
              <Field
                as={TextField}
                type="text"
                id="productFilterlist"
                name="productFilterlist"
                label="Product Filter List"
              />
            </div>
            <hr style={{ border: "0px" }} />
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateSubProduct;
