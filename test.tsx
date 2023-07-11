import React, { useEffect, useState } from "react";
import { Field, Form, useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Grid,
} from "@material-ui/core";

const validationSchema = Yup.object().shape({
  // Existing validation schema...
});

const CreateProduct: React.FC = () => {
  const [filterOptions, setFilterOptions] = useState([]); // State to store filter options
  const formik = useFormik({
    initialValues: {
      // Existing initial values...
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  useEffect(() => {
    // Fetch filter options from the backend
    fetch("/api/filter-options")
      .then((response) => response.json())
      .then((data) => {
        setFilterOptions(data);
      })
      .catch((error) => {
        console.log("Error fetching filter options:", error);
      });
  }, []);

  const handleSubmit = (values: any) => {
    console.log(values);
    // Handle form submission logic here...

    // Save new filter options to filter list API
    const newFilterOptions = formik.values.productFilterlist.filter(
      (option) =>
        !filterOptions.some((existingOption) => existingOption.value === option)
    );
    if (newFilterOptions.length > 0) {
      saveFilterOptions(newFilterOptions);
    }
  };

  const handleFilterOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, checked } = event.target;
    let updatedFilterList = [...formik.values.productFilterlist];
    if (checked) {
      updatedFilterList.push(value);
    } else {
      updatedFilterList = updatedFilterList.filter((item) => item !== value);
    }
    formik.setFieldValue(name, updatedFilterList);
  };

  const handleAddCustomFilterOption = () => {
    const customOption = formik.values.productFilterlist.trim();
    if (
      customOption &&
      !filterOptions.some((option) => option.value === customOption)
    ) {
      const updatedFilterOptions = [
        ...filterOptions,
        { value: customOption, label: customOption },
      ];
      setFilterOptions(updatedFilterOptions);
      formik.setFieldValue("productFilterlist", [
        ...formik.values.productFilterlist,
        customOption,
      ]);
      saveFilterOptions([customOption]);
    }
  };

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
      <h3>Create Product</h3>
      <Form style={{ gap: "10px" }} onSubmit={formik.handleSubmit}>
        <div>{/* Existing fields... */}</div>

        <div>
          <Field
            as={TextField}
            type="text"
            id="productFilterlist"
            name="productFilterlist"
            label="Product Filter List"
          />
        </div>

        <div id="filterOptions">
          {filterOptions.map((option) => (
            <div key={option.value}>
              <Field
                as={Checkbox}
                type="checkbox"
                id={`filterOption_${option.value}`}
                name="productFilterlist"
                value={option.value}
                checked={formik.values.productFilterlist.includes(option.value)}
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
      </Form>
    </div>
  );
};

export default CreateProduct;

// import React from "react";
// import { Formik, Field, Form, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import useCreateProduct from "../../hooks/Product/useCreateProduct";

// const validationSchema = Yup.object().shape({
//   categoryId: Yup.string().required("Category is required"),
//   productName: Yup.string().required("Product name is required"),
//   productDescription: Yup.string().required("Product description is required"),
//   productImage: Yup.mixed().required("Product image is required"),
//   productActive: Yup.boolean().required("Product active status is required"),
//   productSequence: Yup.number().required("Product sequence is required"),
//   productFilterlist: Yup.string().required("Product filter list is required"),
// });

// /*
/*
  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const productData = {
      categoryId: formData.get("categoryId") as string,
      productName: formData.get("productName") as string,
      productDescription: formData.get("productDescription") as string,
      productImage: formData.get("productImage") as File,
      productActive: Boolean(formData.get("productActive")),
      productSequence: Number(formData.get("productSequence")),
      productFilterlist: formData.get("productFilterlist") as string,
    };
    createProductMutation.mutate(productData);
  };
  // return (
  //   <div>
  //     <h3>Create Product</h3>
  //   </div>
  // );
  */

// const CreateProduct: React.FC = () => {
//   const createProductMutation = useCreateProduct();

//   const handleSubmit = (values: any) => {
//     createProductMutation.mutate(values);
//   };
//   return (
//     <div>
//       <h3>Create Product</h3>
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
//         {({ setFieldValue }) => (
//           <Form>
//             <div>
//               <label htmlFor="categoryId">Category:</label>
//               <Field type="text" id="categoryId" name="categoryId" />
//               <ErrorMessage
//                 name="categoryId"
//                 component="div"
//                 className="error"
//               />
//             </div>

//             <div>
//               <label htmlFor="productName">Product Name:</label>
//               <Field type="text" id="productName" name="productName" />
//               <ErrorMessage
//                 name="productName"
//                 component="div"
//                 className="error"
//               />
//             </div>

//             <div>
//               <label htmlFor="productDescription">Product Description:</label>
//               <Field
//                 type="text"
//                 id="productDescription"
//                 name="productDescription"
//               />
//               <ErrorMessage
//                 name="productDescription"
//                 component="div"
//                 className="error"
//               />
//             </div>

//             <div>
//               <label htmlFor="productImage">Product Image:</label>
//               <input
//                 type="file"
//                 id="productImage"
//                 name="productImage"
//                 // onChange={(event) => {
//                 //   setFieldValue("productImage", event.currentTarget.files[0]);
//                 // }}
//               />
//               <ErrorMessage
//                 name="productImage"
//                 component="div"
//                 className="error"
//               />
//             </div>

//             <div>
//               <label htmlFor="productActive">
//                 <Field
//                   type="checkbox"
//                   id="productActive"
//                   name="productActive"
//                 />
//                 Active
//               </label>
//               <ErrorMessage
//                 name="productActive"
//                 component="div"
//                 className="error"
//               />
//             </div>

//             <div>
//               <label htmlFor="productSequence">Product Sequence:</label>
//               <Field
//                 type="number"
//                 id="productSequence"
//                 name="productSequence"
//               />
//               <ErrorMessage
//                 name="productSequence"
//                 component="div"
//                 className="error"
//               />
//             </div>

//             <div>
//               <label htmlFor="productFilterlist">Product Filter List:</label>
//               <Field
//                 type="text"
//                 id="productFilterlist"
//                 name="productFilterlist"
//               />
//               <ErrorMessage
//                 name="productFilterlist"
//                 component="div"
//                 className="error"
//               />
//             </div>

//             <button type="submit">Save</button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default CreateProduct;
