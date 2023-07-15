import React, { useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  FormControl,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import useCreateSubProduct from "../../hooks/Product/useCreateSubProduct";

const CreateSubProduct: React.FC = () => {
  const createSubProductMutation = useCreateSubProduct();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    // formData.append("SubProductImage", selectedImage);

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

  return (
    <div>
      <h3>Create SubProduct</h3>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <TextField label="ProdId" name="ProdId" required />
          <TextField label="FilterValues" name="FilterValues" required />
          <TextField label="Name" name="Name" required />

          <label htmlFor="SubProductImage">
            <Button variant="contained" component="span">
              Choose SubProduct
            </Button>
            <input
              accept="image/*"
              type="file"
              id="SubProductImage"
              name="SubProductImage"
              placeholder="Choose SubProduct"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </label>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="SubProduct Preview"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "10%",
              }}
            />
          )}
          <FormControlLabel
            control={<Checkbox name="Active" color="primary" />}
            label="Active"
          />
          <TextField label="FilterList" name="FilterList" required />
          <Button type="submit" variant="contained" color="primary">
            Create
          </Button>
        </FormControl>
      </form>
    </div>
  );
};

export default CreateSubProduct;

// import React, { useState } from "react";
// import {
//   Button,
//   Checkbox,
//   FormControlLabel,
//   FormControl,
//   TextField,
// } from "@mui/material";
// import useCreateSubProduct from "../../hooks/Product/useCreateSubProduct";

// const CreateSubProduct: React.FC = () => {
//   const createSubProductMutation = useCreateSubProduct();
//   // const [imagePreviews, setImagePreviews] = useState<File[]>([]);
//   const [imagePreviews, setImagePreviews] = useState<string[]>([]);
//   // const [imageFiles, setImageFiles] = useState<File[]>([]);

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const formData = new FormData(e.currentTarget);
//     const SubProductData = {
//       ProdId: (formData.get("ProdId") as string).split(","),
//       FilterValues: (formData.get("FilterValues") as string).split(","),
//       Name: formData.get("Name") as string,
//       Active: Boolean(formData.get("Active")),
//       // SubProductImage: formData.get("SubProductImage") as unknown as FileList,
//       SubProductImage: formData.get("Image") as File,

//       SubProductFilterValues: (formData.get("FilterValues") as string).split(
//         ","
//       ),
//     };
//     console.log("data :", SubProductData);
//     createSubProductMutation.mutate(SubProductData);
//   };

//   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = event.currentTarget.files;

//     if (files && files.length > 0) {
//       const selectedFiles: File[] = Array.from(files);
//       console.log("selectedFiles:", selectedFiles);
//       setImageFiles(selectedFiles);
//       setImagePreviews(selectedFiles);
//     } else {
//       setImagePreviews([]);
//     }
//     /* if (files && files.length > 0) {
//       const previewURLs: string[] = [];
//       Array.from(files).forEach((file) => {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           previewURLs.push(reader.result as string);
//           if (previewURLs.length === files.length) {
//             setImagePreviews(previewURLs);
//           }
//         };
//         reader.readAsDataURL(file);
//       });
//     } else {
//       setImagePreviews([]);
//     }*/
//   };

//   return (
//     <div>
//       <h3>Create SubProduct</h3>
//       <form onSubmit={handleSubmit}>
//         <FormControl>
//           <TextField label="ProdId" name="ProdId" required />
//           <TextField label="FilterValues" name="FilterValues" required />
//           <TextField label="Name" name="Name" required type="number" />
//           <TextField label=" Detail" name="Detail" multiline required />
//           {/* ---------------------------------- image
//           --------------------------------- */}
//           <label htmlFor="SubProductImage">
//             <Button variant="contained" component="span">
//               Choose SubProduct
//             </Button>
//             <input
//               accept="image/*"
//               type="file"
//               id="SubProductImage"
//               name="SubProductImage"
//               placeholder="choose SubProduct"
//               onChange={(event) => {
//                 const file =
//                   event.currentTarget.files && event.currentTarget.files[0];
//                 console.log("file:", file);
//                 if (file) {
//                   const reader = new FileReader();
//                   reader.onloadend = () => {
//                     setImagePreviews(reader.result as string);
//                   };
//                   reader.readAsDataURL(file);
//                 } else {
//                   setImagePreviews(null);
//                 }
//               }}
//               style={{ display: "none" }}
//             />
//           </label>
//           {imagePreviews && (
//             <img
//               src={imagePreviews}
//               alt="SubProduct Preview"
//               style={{
//                 width: "100px",
//                 height: "100px",
//                 borderRadius: "10%",
//               }}
//             />
//           )}

//           {/* ---------------------------------- end ---------------------------------
//           <label htmlFor="Image">
//             <Button variant="contained" component="span">
//               Choose Image
//             </Button>
//             <input
//               accept="image/*"
//               type="file"
//               id="Image"
//               name="Image"
//               placeholder="choose "
//               multiple
//               onChange={handleImageChange}
//               style={{ display: "none" }}
//             />
//           </label>{" "}
//           <div style={{ display: "flex", flexWrap: "wrap" }}>
//             {imagePreviews.map((file, index) => (
//               <img
//                 key={index}
//                 src={URL.createObjectURL(file)}
//                 alt={` Preview ${index + 1}`}
//                 style={{
//                   width: "100px",
//                   height: "100px",
//                   borderRadius: "10%",
//                   margin: "5px",
//                 }}
//               />
//             ))}
//           </div>
//               */}
//           <FormControlLabel
//             control={<Checkbox name="Active" color="primary" />}
//             label=" Active"
//           />
//           <TextField label="FilterValues" name="FilterValues" required />
//           <Button type="submit" variant="contained" color="primary">
//             Create
//           </Button>
//         </FormControl>
//       </form>
//     </div>
//   );
// };

// export default CreateSubProduct;

/* ------------------------------- LAter check ------------------------------ */

// import React from "react";
// import { useState } from "react";
// import { Formik, Field, Form, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import {
//   TextField,
//   Checkbox,
//   FormControlLabel,
//   Button,
//   Grid,
// } from "@material-ui/core";
// import useCreateSubProduct from "../../hooks/SubProduct/useCreateSubProduct";

// const validationSchema = Yup.object().shape({
//  ProdId: Yup.number().required("Category is required"),
//   FilterValues: Yup.string().required("SubProduct name is required"),
//   SubProductDetail: Yup.string().required("SubProduct Detail is required"),
//   SubProductImage: Yup.mixed().required("SubProduct image is required"), //check
//   Active: Yup.boolean().required("SubProduct active status is required"),
//   SubProductPrice: Yup.number().required("SubProduct Price is required"),
//   SubProductFilterValues: Yup.string().required("SubProduct filter list is required"), //check
// });

// const CreateSubProduct: React.FC = () => {
// const createSubProductMutation = useCreateSubProduct();
// const [imagePreview, setImagePreview] = useState<string | null>(null);
// const handleSubmit = (values: any) => {
//   console.log(values);
//   createSubProductMutation.mutate(values);
// };

//   return (
//     <div>
//       <h3>Create SubProduct</h3>
//       <Formik
//         initialValues={{
//           ProdId: "",
//           FilterValues: "",
//           SubProductDetail: "",
//           SubProductImage: null,
//           Active: false,
//           SubProductPrice: 0,
//           SubProductFilterValues: "",
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
//                 id="ProdId"
//                 name="ProdId"
//                 label="ProdId"
//               />
//             </div>

//             <div>
//               <Field
//                 as={TextField}
//                 type="text"
//                 id="FilterValues"
//                 name="FilterValues"
//                 label="SubProduct Name"
//               />
//             </div>

//             <div>
//               <Field
//                 as={TextField}
//                 type="text"
//                 id="SubProductDetail"
//                 name="SubProductDetail"
//                 label="SubProduct Detail"
//               />
//             </div>

//             <div>
//               <Grid
//                 SubProduct
//                 xs={12}
//                 sm={6}
//                 style={{ display: "flex", alignSubProducts: "center" }}
//                 component="div"
//               >
// <label htmlFor="SubProductImage">
//   <Button variant="contained" component="span">
//     Choose SubProduct
//   </Button>
//   <input
//     accept="image/*"
//     type="file"
//     id="SubProductImage"
//     name="SubProductImage"
//     placeholder="choose SubProduct"
//     onChange={(event) => {
//       const file =
//         event.currentTarget.files &&
//         event.currentTarget.files[0];
//       setFieldValue("SubProductImage", file);
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
//     alt="SubProduct Preview"
//     style={{
//       width: "100px",
//       height: "100px",
//       borderRadius: "10%",
//     }}
//   />
// )}
// <ErrorMessage
//   name="SubProductImage"
//   component="div"
//   className="error"
// />
//               </Grid>
//             </div>

//             <div>
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     id="SubProductActive"
//                     name="SubProductActive"
//                     color="primary"
//                     checked={values.SubProductActive}
//                     onChange={(event) => {
//                       setFieldValue("SubProductActive", event.target.checked);
//                     }}
//                   />
//                 }
//                 label="Active"
//               />
//               <ErrorMessage
//                 name="SubProductActive"
//                 component="div"
//                 className="error"
//               />
//             </div>

//             <div>
//               <Field
//                 as={TextField}
//                 type="number"
//                 id="SubProductPrice"
//                 name="SubProductPrice"
//                 label="SubProduct Price"
//               />
//             </div>

//             <div>
//               <Field
//                 as={TextField}
//                 type="text"
//                 id="productFilterValues"
//                 name="productFilterValues"
//                 label="Product Filter List"
//               />
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

// export default CreateSubProduct;
