import React from "react";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import {
  Formik,
  Field,
  Form,
  ErrorMessage,
  useFormik,
  FormikProps,
} from "formik";
import * as Yup from "yup";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Grid,
} from "@material-ui/core";
import useCreateCategory from "../../hooks/Category/useCreateCategory";
interface FilterOption {
  value: string;
  label: string;
}
interface FormValues {
  categoryId: string;
  categoryName: string;
  categoryDescription: string;
  categoryImage: File | null;
  categoryActive: boolean;
  categorySequence: number;
  categoryFilterlist: string[];
}

const validationSchema = Yup.object().shape({
  categoryId: Yup.number().required("Category is required"),
  categoryName: Yup.string().required("category name is required"),
  categoryDescription: Yup.string().required(
    "category description is required"
  ),
  categoryImage: Yup.mixed().required("category image is required"), //check
  categoryActive: Yup.boolean().required("category active status is required"),
  categorySequence: Yup.number().required("category sequence is required"),
  categoryFilterlist: Yup.string().required("category filter list is required"), //check
});

const CreateCategory: React.FC = () => {
  const createcategoryMutation = useCreateCategory();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>([]); // State to store filter options

  const formik: FormikProps<FormValues> = useFormik({
    initialValues: {
      // Existing initial values...
      categoryId: "",
      categoryName: "",
      categoryDescription: "",
      categoryImage: null,
      categoryActive: false,
      categorySequence: 0,
      categoryFilterlist: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values: any) => {
      handleSubmit(values);
    },
  });

  /* ------------------ Fetch filter options from the backend ----------------- */
  useEffect(() => {
    fetch("/api/filter-options")
      .then((response) => response.json())
      .then((data) => {
        setFilterOptions(data);
      })
      .catch((error) => {
        console.log("Error fetching filter options:", error);
      });
  }, []);

  /* --------------- Save new filter options to filter list API --------------- */
  const handleSubmit = (values: any) => {
    console.log(values);
    createcategoryMutation.mutate(values);
    // Save new filter options to filter list API
    const newFilterOptions = values.categoryFilterlist.filter(
      (option: any) =>
        !filterOptions.some((existingOption) => existingOption.value === option)
    );
    if (newFilterOptions.length > 0) {
      saveFilterOptions(newFilterOptions);
    }
  };

  /* ------------------------------------ # ----------------------------------- */
  const handleFilterOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;
    let updatedFilterList = [...formik.values.categoryFilterlist];
    if (checked) {
      updatedFilterList.push(value);
    } else {
      updatedFilterList = updatedFilterList.filter((item) => item !== value);
    }
    formik.setFieldValue(name, updatedFilterList);
  };
  /* ------------------------------------ 4 ----------------------------------- */
  const handleAddCustomFilterOption = () => {
    const customOption =
      formik.values.categoryFilterlist[
        formik.values.categoryFilterlist.length - 1
      ].trim();
    if (
      customOption &&
      !filterOptions.some((option) => option.value === customOption)
    ) {
      const updatedFilterOptions = [
        ...filterOptions,
        { value: customOption, label: customOption },
      ];
      setFilterOptions(updatedFilterOptions);
      formik.setFieldValue("categoryFilterlist", [
        ...formik.values.categoryFilterlist,
        customOption,
      ]);
      saveFilterOptions([customOption]);
    }
  };

  /* ----------------- Save the options to the filter list API ---------------- */
  const saveFilterOptions = (options: string[]) => {
    // Save the options to the filter list API
    fetch("/api/save-filter-options", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Filter options saved successfully:", data);
      })
      .catch((error) => {
        console.log("Error saving filter options:", error);
      });
  };

  return (
    <div>
      <h3>Create category</h3>,
      <Formik
        initialValues={{
          categoryId: "",
          categoryName: "",
          categoryDescription: "",
          categoryImage: null,
          categoryActive: false,
          categorySequence: 0,
          categoryFilterlist: "",
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
                id="categoryName"
                name="categoryName"
                label="category Name"
              />
            </div>

            <div>
              <Field
                as={TextField}
                type="text"
                id="categoryDescription"
                name="categoryDescription"
                label="category Description"
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
                <label htmlFor="categoryImage">
                  <Button variant="contained" component="span">
                    Choose category
                  </Button>
                  <input
                    accept="image/*"
                    type="file"
                    id="categoryImage"
                    name="categoryImage"
                    placeholder="choose category"
                    onChange={(event) => {
                      const file =
                        event.currentTarget.files &&
                        event.currentTarget.files[0];
                      setFieldValue("categoryImage", file);
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
                    alt="category Preview"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "10%",
                    }}
                  />
                )}
                <ErrorMessage
                  name="categoryImage"
                  component="div"
                  className="error"
                />
              </Grid>
            </div>

            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    id="categoryActive"
                    name="categoryActive"
                    color="primary"
                    checked={values.categoryActive}
                    onChange={(event) => {
                      setFieldValue("categoryActive", event.target.checked);
                    }}
                  />
                }
                label="Active"
              />
              <ErrorMessage
                name="categoryActive"
                component="div"
                className="error"
              />
            </div>

            <div>
              <Field
                as={TextField}
                type="number"
                id="categorySequence"
                name="categorySequence"
                label="category Sequence"
              />
            </div>

            <div>
              <Field
                as={TextField}
                type="text"
                id="categoryFilterlist"
                name="categoryFilterlist"
                label="category Filter List"
              />
              {/* <div>
                <Field
                  as={TextField}
                  type="text"
                  id="categoryFilterlist"
                  name="categoryFilterlist"
                  label="category Filter List"
                />
              </div> */}

              <div id="filterOptions">
                {filterOptions.map((option) => (
                  <div key={option.value}>
                    <Field
                      as={Checkbox}
                      type="checkbox"
                      id={`filterOption_${option.value}`}
                      name="categoryFilterlist"
                      value={option.value}
                      checked={formik.values.categoryFilterlist.includes(
                        option.value
                      )}
                      label={option.label}
                      onChange={handleFilterOptionChange}
                    />
                    <label htmlFor={`filterOption_${option.value}`}>
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>

              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={handleAddCustomFilterOption}
              >
                Add Custom Filter Option
              </Button>

              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
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

export default CreateCategory;
