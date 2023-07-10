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
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL as string}/product/createProduct`,
      productData
    );
    return response.data as object;
  } catch (error) {
    throw new Error("Failed to create product");
  }
};

const useCreateProduct = (): UseMutationResult<any, Error, ProductData> => {
  return useMutation(createProduct);
};

export default useCreateProduct;
