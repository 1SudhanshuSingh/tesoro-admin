import { useMutation, UseMutationResult } from "react-query";
import axios from "axios";
// import { CreateSubProduct } from "../../features/SubProduct";

export interface SubProdData {
  ProdID: number[];
  FilterValues: string[];
  Name: string;
  Active: boolean;
  FilterList: number[];
  Image: File | null;
}

const CreateSubProduct = async (SubProdData: SubProdData): Promise<object> => {
  console.log("from use:", SubProdData?.Image);
  try {
    const formData = new FormData();
    formData.append("ProdID", JSON.stringify(SubProdData.ProdID));
    // SubProdData.ProdID.forEach((value, index) => {
    //   formData.append(`ProdID[${index}]`, value);
    // });
    SubProdData.FilterValues.forEach((value, index) => {
      formData.append(`FilterValues[${index}]`, value);
    });
    formData.append("Name", SubProdData.Name);

    formData.append(
      "Active",
      SubProdData.Active.toString().slice(0, 1).toUpperCase()
    );

    // Append each FilterList individually
    // SubProdData.FilterList.forEach((value, index) => {
    //   formData.append(`FilterList[${index}]`, value);
    // });
    formData.append("FilterList", JSON.stringify(SubProdData.FilterList));
    if (SubProdData.Image) {
      formData.append("Image", SubProdData.Image);
    }
    // formData.append("ProdID", SubProdData.ProdID.toString());
    // formData.append("filterValues", SubProdData.filterValues.toString());
    // SubProdData.ItemImage.forEach((image, index) => {
    //   formData.append(`ItemImage${index + 1}`, image);
    // });
    console.log("formData", formData);
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL as string}/product/createSubProduct`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data as object;
  } catch (error) {
    throw new Error("Failed to create SubProduct");
  }
};

const useCreateSubProduct = (): UseMutationResult<any, Error, SubProdData> => {
  return useMutation(CreateSubProduct);
};

export default useCreateSubProduct;

/*import { useMutation, UseMutationResult } from "react-query";
import axios from "axios";
// import { CreateSubProduct } from "../../features/SubProduct";

export interface SubProdData {
  ProdID: string[];
  FilterValues: string[];
  Name: string;
  Active: boolean;
  FilterList: string[];
  Image: File | null;
}

const CreateSubProduct = async (SubProdData: SubProdData): Promise<object> => {
  console.log("from use:", SubProdData?.Image);
  try {
    const formData = new FormData();
    SubProdData.ProdID.forEach((value, index) => {
      formData.append(`ProdID[${index}]`, value);
    });
    SubProdData.FilterValues.forEach((value, index) => {
      formData.append(`FilterValues[${index}]`, value);
    });
    formData.append("Name", SubProdData.Name);

    formData.append(
      "Active",
      SubProdData.Active.toString().slice(0, 1).toUpperCase()
    );

    // Append each FilterList individually
    SubProdData.FilterList.forEach((value, index) => {
      formData.append(`FilterList[${index}]`, value);
    });
    if (SubProdData.Image) {
      formData.append("Image", SubProdData.Image);
    }
    // formData.append("ProdID", SubProdData.ProdID.toString());
    // formData.append("filterValues", SubProdData.filterValues.toString());
    // SubProdData.ItemImage.forEach((image, index) => {
    //   formData.append(`ItemImage${index + 1}`, image);
    // });
    console.log("formData", formData);
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL as string}/product/createSubProduct`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data as object;
  } catch (error) {
    throw new Error("Failed to create SubProduct");
  }
};

const useCreateSubProduct = (): UseMutationResult<any, Error, SubProdData> => {
  return useMutation(CreateSubProduct);
};

export default useCreateSubProduct;*/
