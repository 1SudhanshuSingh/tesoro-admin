import React, { useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormControl,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { ChipsArray, MultipleSelectChip } from "../../components";
import useCreateProduct from "../../hooks/Product/useCreateProduct";
import { OptionData } from "./Dummy";
import FilterModal from "./components/FiltesModal";
import OptionModal from "./components/OptionModal";
import useFiltersAvailableForProdId from "../../hooks/Filter/useFiltersAvailableForProdId";
import useCreateMasterFilter from "../../hooks/Filter/useCreateMasterFilter";

const CreateProduct: React.FC = () => {
  const [prodId, setProdId] = useState<number>(0);
  const { isLoading, filterData, refetch } =
    useFiltersAvailableForProdId(prodId);
  const { createMasterFilter, data: createdDataRes } = useCreateMasterFilter();

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
  return (
    <>
      <h3>Create Product</h3>
      <Grid container gap={2}>
        <Grid xs={6}>
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
          <Grid container marginTop={2}>
            <Grid sm={2}>
              <Typography>Active</Typography>
            </Grid>
            <Grid sm={10}>
              <RadioGroup
                aria-label="active"
                name="active"
                value={activeOption}
                onChange={handleOptionChange}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </Grid>
          </Grid>
          <Grid padding={1} marginTop={2}>
            <TextField label="Product Sequence" fullWidth />
          </Grid>
          <Grid container marginTop={2}>
            <ChipsArray
              title="Manage Filter"
              data={prodId === 0 ? [] : filterData}
            />
          </Grid>
          <Grid container marginY={2}>
            <Button
              variant="outlined"
              onClick={() => setShowAttachNewFilter(true)}
            >
              Attach New Filter
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
      />
      <OptionModal
        data={OptionData}
        show={showAttachOption}
        handleShow={setShowAttachOption}
        handleBackToFilter={handleBackToFilter}
      />
    </>
  );
};

export default CreateProduct;

/*
const Createproduct: React.FC = () => {
  const createProductMutation = useCreateProduct();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const ProductData = {
      categoryId: Number(formData.get("productId")),
      productName: formData.get("productName") as string,
      productDescription: formData.get("productDescription") as string,
      productImage: formData.get("productImage") as File,
      // productImage: formData.get("ProductImage") as File,
      productActive: Boolean(formData.get("productActive")),
      productSequence: Number(formData.get("productSequence")),
      productFilterlist: formData.get("productFilterlist") as string,
    };
    console.log("data :", ProductData);
    createProductMutation.mutate(ProductData);

return (
    
    <div>
      <h3>Create Product</h3>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <TextField
            label="Product catID"
            name="productId"
            required
            type="number"
          />
          <TextField label="Product Name" name="productName" required />
          <TextField
            label="Product Description"
            name="productDescription"
            multiline
            required
          />
          {/*  <label htmlFor="productImage">
            <Button variant="contained" component="span">
              Choose Product Image
            </Button>
            <input
              accept="image/*"
              type="file"
              id="productImage"
              name="productImage"
              placeholder="choose Product"
              onChange={(event) => {
                const file =
                  event.currentTarget.files && event.currentTarget.files[0];
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
          )}}

          <input type="file" name="productImage" required />
          <FormControlLabel
            control={<Checkbox name="productActive" color="primary" />}
            label="Product Active"
          />
          <TextField
            label="Product Sequence"
            name="productSequence"
            type="number"
            required
          />
          <TextField
            label="Product Filter List"
            name="productFilterlist"
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Create
          </Button>
        </FormControl>
      </form>
    </div>
*/

// import React from "react";
// import { useState, useEffect, ChangeEvent, FormEvent } from "react";
// import {
//   Formik,
//   Field,
//   Form,
//   ErrorMessage,
//   useFormik,
//   FormikProps,
// } from "formik";
// import * as Yup from "yup";
// import {
//   TextField,
//   Checkbox,
//   FormControlLabel,
//   Button,
//   Grid,
// } from "@material-ui/core";
// import useCreateProduct from "../../hooks/Product/useCreateProduct";
// interface FilterOption {
//   value: string;
//   label: string;
// }
// interface FormValues {
//   categoryId: string;
//   productName: string;
//   productDescription: string;
//   productImage: File | null;
//   productActive: boolean;
//   productSequence: number;
//   productFilterlist: string[];
// }

// const validationSchema = Yup.object().shape({
//   categoryId: Yup.number().required("Category is required"),
//   productName: Yup.string().required("Product name is required"),
//   productDescription: Yup.string().required("Product description is required"),
//   productImage: Yup.mixed().required("Product image is required"), //check
//   productActive: Yup.boolean().required("Product active status is required"),
//   productSequence: Yup.number().required("Product sequence is required"),
//   productFilterlist: Yup.string().required("Product filter list is required"), //check
// });

// const CreateProduct: React.FC = () => {
//   const createProductMutation = useCreateProduct();
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [filterOptions, setFilterOptions] = useState<FilterOption[]>([]); // State to store filter options

//   const formik: FormikProps<FormValues> = useFormik({
//     initialValues: {
//       // Existing initial values...
//       categoryId: "",
//       productName: "",
//       productDescription: "",
//       productImage: null,
//       productActive: false,
//       productSequence: 0,
//       productFilterlist: [],
//     },
//     validationSchema: validationSchema,
//     onSubmit: (values: any) => {
//       handleSubmit(values);
//     },
//   });

//   /* ------------------ Fetch filter options from the backend ----------------- */
//   useEffect(() => {
//     fetch("/api/filter-options")
//       .then((response) => response.json())
//       .then((data) => {
//         setFilterOptions(data);
//       })
//       .catch((error) => {
//         console.log("Error fetching filter options:", error);
//       });
//   }, []);

//   /* --------------- Save new filter options to filter list API --------------- */
//   const handleSubmit = (values: any) => {
//     console.log(values);
//     createProductMutation.mutate(values);
//     // Save new filter options to filter list API
//     const newFilterOptions = values.productFilterlist.filter(
//       (option: any) =>
//         !filterOptions.some((existingOption) => existingOption.value === option)
//     );
//     if (newFilterOptions.length > 0) {
//       saveFilterOptions(newFilterOptions);
//     }
//   };

//   /* ------------------------------------ # ----------------------------------- */
//   const handleFilterOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const { name, value, checked } = event.target;
//     let updatedFilterList = [...formik.values.productFilterlist];
//     if (checked) {
//       updatedFilterList.push(value);
//     } else {
//       updatedFilterList = updatedFilterList.filter((item) => item !== value);
//     }
//     formik.setFieldValue(name, updatedFilterList);
//   };
//   /* ------------------------------------ 4 ----------------------------------- */
//   const handleAddCustomFilterOption = () => {
//     const customOption =
//       formik.values.productFilterlist[
//         formik.values.productFilterlist.length - 1
//       ].trim();
//     if (
//       customOption &&
//       !filterOptions.some((option) => option.value === customOption)
//     ) {
//       const updatedFilterOptions = [
//         ...filterOptions,
//         { value: customOption, label: customOption },
//       ];
//       setFilterOptions(updatedFilterOptions);
//       formik.setFieldValue("productFilterlist", [
//         ...formik.values.productFilterlist,
//         customOption,
//       ]);
//       saveFilterOptions([customOption]);
//     }
//   };

//   /* ----------------- Save the options to the filter list API ---------------- */
//   const saveFilterOptions = (options: string[]) => {
//     // Save the options to the filter list API
//     fetch("/api/save-filter-options", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(options),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Filter options saved successfully:", data);
//       })
//       .catch((error) => {
//         console.log("Error saving filter options:", error);
//       });
//   };

//   return (
//     <div>
//       <h3>Create Product</h3>,
//       <Formik
//         initialValues={{
//           categoryId: "",
//           productName: "",
//           productDescription: "",
//           productImage: null,
//           productActive: false,
//           productSequence: 0,
//           productFilterlist: "",
//         }}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ values, setFieldValue }) => (
//           <Form style={{ gap: "10px" }}>
//             <div>
//               <Field
//                 as={TextField}
//                 type="text"
//                 id="categoryId"
//                 name="categoryId"
//                 label="Category"
//               />
//             </div>

//             <div>
//               <Field
//                 as={TextField}
//                 type="text"
//                 id="productName"
//                 name="productName"
//                 label="Product Name"
//               />
//             </div>

//             <div>
//               <Field
//                 as={TextField}
//                 type="text"
//                 id="productDescription"
//                 name="productDescription"
//                 label="Product Description"
//               />
//             </div>

//             <div>
//               <Grid
//                 item
//                 xs={12}
//                 sm={6}
//                 style={{ display: "flex", alignItems: "center" }}
//                 component="div"
//               >
// <label htmlFor="productImage">
//   <Button variant="contained" component="span">
//     Choose Product
//   </Button>
//   <input
//     accept="image/*"
//     type="file"
//     id="productImage"
//     name="productImage"
//     placeholder="choose Product"
//     onChange={(event) => {
//       const file =
//         event.currentTarget.files &&
//         event.currentTarget.files[0];
//       setFieldValue("productImage", file);
//       console.log("file:", file);
//       if (file) {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           setImagePreview(reader.result as string);
//         };
//         reader.readAsDataURL(file);
//       } else {
//         setImagePreview(null);
//       }
//     }}
//     style={{ display: "none" }}
//   />
// </label>
// {imagePreview && (
//   <img
//     src={imagePreview}
//     alt="Product Preview"
//     style={{
//       width: "100px",
//       height: "100px",
//       borderRadius: "10%",
//     }}
//   />
// )}
//                 <ErrorMessage
//                   name="productImage"
//                   component="div"
//                   className="error"
//                 />
//               </Grid>
//             </div>

//             <div>
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     id="productActive"
//                     name="productActive"
//                     color="primary"
//                     checked={values.productActive}
//                     onChange={(event) => {
//                       setFieldValue("productActive", event.target.checked);
//                     }}
//                   />
//                 }
//                 label="Active"
//               />
//               <ErrorMessage
//                 name="productActive"
//                 component="div"
//                 className="error"
//               />
//             </div>

//             <div>
//               <Field
//                 as={TextField}
//                 type="number"
//                 id="productSequence"
//                 name="productSequence"
//                 label="Product Sequence"
//               />
//             </div>

//             <div>
//               <Field
//                 as={TextField}
//                 type="text"
//                 id="productFilterlist"
//                 name="productFilterlist"
//                 label="Product Filter List"
//               />
//               {/* <div>
//                 <Field
//                   as={TextField}
//                   type="text"
//                   id="productFilterlist"
//                   name="productFilterlist"
//                   label="Product Filter List"
//                 />
//               </div> */}

//               <div id="filterOptions">
//                 {filterOptions.map((option) => (
//                   <div key={option.value}>
//                     <Field
//                       as={Checkbox}
//                       type="checkbox"
//                       id={`filterOption_${option.value}`}
//                       name="productFilterlist"
//                       value={option.value}
//                       checked={formik.values.productFilterlist.includes(
//                         option.value
//                       )}
//                       label={option.label}
//                       onChange={handleFilterOptionChange}
//                     />
//                     <label htmlFor={`filterOption_${option.value}`}>
//                       {option.label}
//                     </label>
//                   </div>
//                 ))}
//               </div>

//               <Button
//                 type="button"
//                 variant="contained"
//                 color="primary"
//                 onClick={handleAddCustomFilterOption}
//               >
//                 Add Custom Filter Option
//               </Button>

//               <Button type="submit" variant="contained" color="primary">
//                 Save
//               </Button>
//             </div>
//             <hr style={{ border: "0px" }} />
//             <Button type="submit" variant="contained" color="primary">
//               Save
//             </Button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default CreateProduct;
