import React, { useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormControl,
  TextField,
} from "@mui/material";
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
    /* if (files && files.length > 0) {
      const previewURLs: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          previewURLs.push(reader.result as string);
          if (previewURLs.length === files.length) {
            setImagePreviews(previewURLs);
          }
        };
        reader.readAsDataURL(file);
      });
    } else {
      setImagePreviews([]);
    }*/
  };

  return (
    <div>
      <h3>Create Item</h3>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <TextField
            label="Sub ProdId"
            name="subProdId"
            required
            type="number"
          />
          <TextField label="ItemSku" name="ItemSku" required />
          <TextField label="ItemQty" name="ItemQty" required type="number" />
          <TextField label="Item Detail" name="ItemDetail" multiline required />
          <label htmlFor="ItemImage">
            <Button variant="contained" component="span">
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
          </label>{" "}
          <div style={{ display: "flex", flexWrap: "wrap" }}>
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
          </div>
          <FormControlLabel
            control={<Checkbox name="ItemActive" color="primary" />}
            label="Item Active"
          />
          <TextField
            label="Item Price"
            name="ItemPrice"
            type="number"
            required
          />
          <TextField
            label="Item Filter List"
            name="ItemFilterValues"
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Create
          </Button>
        </FormControl>
      </form>
    </div>
  );
};

export default CreateItem;

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
// import useCreateItem from "../../hooks/Item/useCreateItem";

// const validationSchema = Yup.object().shape({
//  subProdId: Yup.number().required("Category is required"),
//   ItemSku: Yup.string().required("Item name is required"),
//   ItemDetail: Yup.string().required("Item Detail is required"),
//   ItemImage: Yup.mixed().required("Item image is required"), //check
//   ItemActive: Yup.boolean().required("Item active status is required"),
//   ItemPrice: Yup.number().required("Item Price is required"),
//   ItemFilterValues: Yup.string().required("Item filter list is required"), //check
// });

// const CreateItem: React.FC = () => {
//   const createItemMutation = useCreateItem();
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const handleSubmit = (values: any) => {
//     console.log(values);
//     createItemMutation.mutate(values);
//   };

//   return (
//     <div>
//       <h3>Create Item</h3>
//       <Formik
//         initialValues={{
//           subProdId: "",
//           ItemSku: "",
//           ItemDetail: "",
//           ItemImage: null,
//           ItemActive: false,
//           ItemPrice: 0,
//           ItemFilterValues: "",
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
//                 id="subProdId"
//                 name="subProdId"
//                 label="subProdId"
//               />
//             </div>

//             <div>
//               <Field
//                 as={TextField}
//                 type="text"
//                 id="ItemSku"
//                 name="ItemSku"
//                 label="Item Name"
//               />
//             </div>

//             <div>
//               <Field
//                 as={TextField}
//                 type="text"
//                 id="ItemDetail"
//                 name="ItemDetail"
//                 label="Item Detail"
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
//                 <label htmlFor="ItemImage">
//                   <Button variant="contained" component="span">
//                     Choose Item
//                   </Button>
//                   <input
//                     accept="image/*"
//                     type="file"
//                     id="ItemImage"
//                     name="ItemImage"
//                     placeholder="choose Item"
//                     onChange={(event) => {
//                       const file =
//                         event.currentTarget.files &&
//                         event.currentTarget.files[0];
//                       setFieldValue("ItemImage", file);
//                       console.log("file:", file);
//                       if (file) {
//                         const reader = new FileReader();
//                         reader.onloadend = () => {
//                           setImagePreview(reader.result as string);
//                         };
//                         reader.readAsDataURL(file);
//                       } else {
//                         setImagePreview(null);
//                       }
//                     }}
//                     style={{ display: "none" }}
//                   />
//                 </label>
//                 {imagePreview && (
//                   <img
//                     src={imagePreview}
//                     alt="Item Preview"
//                     style={{
//                       width: "100px",
//                       height: "100px",
//                       borderRadius: "10%",
//                     }}
//                   />
//                 )}
//                 <ErrorMessage
//                   name="ItemImage"
//                   component="div"
//                   className="error"
//                 />
//               </Grid>
//             </div>

//             <div>
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     id="ItemActive"
//                     name="ItemActive"
//                     color="primary"
//                     checked={values.ItemActive}
//                     onChange={(event) => {
//                       setFieldValue("ItemActive", event.target.checked);
//                     }}
//                   />
//                 }
//                 label="Active"
//               />
//               <ErrorMessage
//                 name="ItemActive"
//                 component="div"
//                 className="error"
//               />
//             </div>

//             <div>
//               <Field
//                 as={TextField}
//                 type="number"
//                 id="ItemPrice"
//                 name="ItemPrice"
//                 label="Item Price"
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

// export default CreateItem;
