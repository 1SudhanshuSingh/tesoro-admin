import { useMutation, UseMutationResult } from "react-query";
import axios from "axios";

export interface ProductData {
  categoryId: number;
  productName: string;
  productDescription: string;
  productImage: File;
  productActive: boolean;
  productSequence: number;
  productFilterlist: string;
}

const createProduct = async (productData: ProductData): Promise<object> => {
  console.log("use", productData);
  try {
    const formData = new FormData();
    formData.append("categoryId", productData.categoryId.toString());
    formData.append("productName", productData.productName);
    formData.append("productDescription", productData.productDescription);
    formData.append("productImage", productData.productImage);
    formData.append("productActive", productData.productActive.toString());
    formData.append("productSequence", productData.productSequence.toString());
    formData.append("productFilterlist", productData.productFilterlist);

    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL as string}/product/createProduct`,
      formData
    );
    return response.data as object;
  } catch (error) {
    throw new Error("Failed to create product");
  }
};

/*
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL as string}/product/createProduct`,
      productData
    );
    return response.data as object;
  } catch (error) {
    throw new Error("Failed to create product");
  }
  */

const useCreateProduct = (): UseMutationResult<any, Error, ProductData> => {
  return useMutation(createProduct);
};

export default useCreateProduct;
