export const dummyProd = [
  {
    id: 1,
    prod_id: 12,
    SubProd_FilterValues: "Value 1",
    SubProd_name: "Red shirt ",
    SubProd_active: "Active",
    SubProd_Filter: "Filter 1",
  },
  {
    id: 10,
    prod_id: 12,
    SubProd_FilterValues: "Value 1",
    SubProd_name: "Red shirt ",
    SubProd_active: "Active",
    SubProd_Filter: "Filter 1",
  },

  {
    id: 2,
    prod_id: 23,
    SubProd_FilterValues: "Value 2",
    SubProd_name: "SubProduct 2",
    SubProd_active: "Active",
    SubProd_Filter: "Filter 2",
  },
  {
    id: 3,
    prod_id: 45,
    SubProd_FilterValues: "Value 3",
    SubProd_name: "SubProduct 3",
    SubProd_active: "Active",
    SubProd_Filter: "Filter 3",
  },
  {
    id: 4,
    prod_id: 22,
    SubProd_FilterValues: "Value 4",
    SubProd_name: "SubProduct 4",
    SubProd_active: "Active",
    SubProd_Filter: "Filter 4",
  },
  {
    id: 5,
    prod_id: 54,
    SubProd_FilterValues: "Value 5",
    SubProd_name: "SubProduct 5",
    SubProd_active: "Active",
    SubProd_Filter: "Filter 5",
  },
  {
    id: 6,
    prod_id: 24,
    SubProd_FilterValues: "Value 6",
    SubProd_name: "SubProduct 6",
    SubProd_active: "Active",
    SubProd_Filter: "Filter 6",
  },
  {
    id: 7,
    prod_id: 11,
    SubProd_FilterValues: "Value 7",
    SubProd_name: "SubProduct 7",
    SubProd_active: "Active",
    SubProd_Filter: "Filter 7",
  },
  {
    id: 8,
    prod_id: 9,
    SubProd_FilterValues: "Value 8",
    SubProd_name: "SubProduct 8",
    SubProd_active: "Active",
    SubProd_Filter: "Filter 8",
  },
  {
    id: 9,
    prod_id: 7,
    SubProd_FilterValues: "Value 9",
    SubProd_name: "SubProduct 9",
    SubProd_active: "Active",
    SubProd_Filter: "Filter 9",
  },
];
/*

  {
    id:1,
    cat_id: 1,
    category: "men",
    products: [
      {
        id: 1,
        prod_catID: 12,
        prod_active: "Yes",
        prod_name: "T Shirt",
        prod_description: "",
        prod_image: "",
        prod_type: [{ id: 1, value: "Summer" }],
        prod_sequence: 2,
        prod_filterList: [{ id: 2, value: "New" }],
        subProducts: [
          {
            id: 1,
            prod_id: 12,
            SubProd_FilterValues: "Value 1",
            SubProd_name: "Red shirt ",
            SubProd_active: "Active",
            SubProd_Filter: "Filter 1",
          },
          {
            id: 1,
            prod_id: 12,
            SubProd_FilterValues: "Value 1",
            SubProd_name: "SubProduct 1",
            SubProd_active: "Active",
            SubProd_Filter: "Filter 1",
          },
          {
            id: 2,
            prod_id: 23,
            SubProd_FilterValues: "Value 2",
            SubProd_name: "SubProduct 2",
            SubProd_active: "Active",
            SubProd_Filter: "Filter 2",
          },
          {
            id: 3,
            prod_id: 45,
            SubProd_FilterValues: "Value 3",
            SubProd_name: "SubProduct 3",
            SubProd_active: "Active",
            SubProd_Filter: "Filter 3",
          },
          {
            id: 4,
            prod_id: 22,
            SubProd_FilterValues: "Value 4",
            SubProd_name: "SubProduct 4",
            SubProd_active: "Active",
            SubProd_Filter: "Filter 4",
          },
          {
            id: 5,
            prod_id: 54,
            SubProd_FilterValues: "Value 5",
            SubProd_name: "SubProduct 5",
            SubProd_active: "Active",
            SubProd_Filter: "Filter 5",
          },
          {
            id: 6,
            prod_id: 24,
            SubProd_FilterValues: "Value 6",
            SubProd_name: "SubProduct 6",
            SubProd_active: "Active",
            SubProd_Filter: "Filter 6",
          },
          {
            id: 7,
            prod_id: 11,
            SubProd_FilterValues: "Value 7",
            SubProd_name: "SubProduct 7",
            SubProd_active: "Active",
            SubProd_Filter: "Filter 7",
          },
          {
            id: 8,
            prod_id: 9,
            SubProd_FilterValues: "Value 8",
            SubProd_name: "SubProduct 8",
            SubProd_active: "Active",
            SubProd_Filter: "Filter 8",
          },
          {
            id: 9,
            prod_id: 7,
            SubProd_FilterValues: "Value 9",
            SubProd_name: "SubProduct 9",
            SubProd_active: "Active",
            SubProd_Filter: "Filter 9",
          },
        ],
      },
      {
        id: 2,
        prod_catID: 23,
        prod_active: "No",
        prod_name: "Pant",
        prod_description: "",
        prod_image: "",
        prod_type: [{ id: 1, value: "Summer" }],
        prod_sequence: 2,
        prod_filterList: [{ id: 2, value: "New" }],
        subProducts: [
          {
            id: 1,
            prod_id: 12,
            SubProd_FilterValues: "Value 1",
            SubProd_name: "Red Pant ",
            SubProd_active: "Active",
            SubProd_Filter: "Filter 1",
          },
        ],
      },
    ],
  },

  // {
  //   id: 1,
  //   prod_catID: 12,
  //   prod_active: "Yes",
  //   prod_name: "T Shirt",
  //   prod_description: "",
  //   prod_image: "",
  //   prod_type: [{id: 1, value: 'Summer'}],
  //   prod_sequence: 2,
  //   prod_filterList: [{id : 2, value: 'New'}]
  // },
  // {
  //   id: 2,
  //   prod_catID: 23,
  //   prod_active: "No",
  //   prod_name: "Pant",
  //   prod_description: "",
  //   prod_image: "",
  //   prod_type: [{id: 1, value: 'Summer'}],
  //   prod_sequence: 2,
  //   prod_filterList: [{id : 2, value: 'New'}]
  // },
  // {
  //   id: 3,
  //   prod_catID: 45,
  //   prod_active: "No",
  //   prod_name: "Boxer",
  //   prod_description: "",
  //   prod_image: "",
  //   prod_type: [{id: 1, value: 'Summer'}],
  //   prod_sequence: 2,
  //   prod_filterList: [{id : 2, value: 'New'}]
  // },
  // {
  //   id: 4,
  //   prod_catID: 22,
  //   prod_active: "Yes",
  //   prod_name: "Shirt",
  //   prod_description: "",
  //   prod_image: "",
  //   prod_type: [{id: 1, value: 'Summer'}],
  //   prod_sequence: 2,
  //   prod_filterList: [{id : 2, value: 'New'}]
  // },
  // {
  //   id: 5,
  //   prod_catID: 54,
  //   prod_active: "No",
  //   prod_name: "Shorts",
  //   prod_description: "",
  //   prod_image: "",
  //   prod_type: [{id: 1, value: 'Summer'}],
  //   prod_sequence: 2,
  //   prod_filterList: [{id : 2, value: 'New'}]
  // },
  // {
  //   id: 6,
  //   prod_catID: 24,
  //   prod_active: "No",
  //   prod_name: "Cargo",
  //   prod_description: "",
  //   prod_image: "",
  //   prod_type: [{id: 1, value: 'Summer'}],
  //   prod_sequence: 2,
  //   prod_filterList: [{id : 2, value: 'New'}]
  // },
  // {
  //   id: 7,
  //   prod_catID: 11,
  //   prod_active: "Yes",
  //   prod_name: "Jeans",
  //   prod_description: "",
  //   prod_image: "",
  //   prod_type: [{id: 1, value: 'Summer'}],
  //   prod_sequence: 1,
  //   prod_filterList: [{id : 2, value: 'New'}],
  // },
  // {
  //   id: 8,
  //   prod_catID: 9,
  //   prod_active: "Yes",
  //   prod_name: "Hoodie",
  //   prod_description: "",
  //   prod_image: "",
  //   prod_type: [{id: 1, value: 'Summer'}],
  //   prod_sequence: 1,
  //   prod_filterList: [{id : 2, value: 'New'}],
  // },
  // {
  //   id: 9,
  //   prod_catID: 7,
  //   prod_active: "Yes",
  //   prod_name: "Jersey",
  //   prod_description: "",
  //   prod_image: "",
  //   prod_type: [{id: 1, value: 'Summer'}],
  //   prod_sequence: 1,
  //   prod_filterList: [{id : 2, value: 'New'}],
  // },
];
*/
