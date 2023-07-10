import { useMutation, UseMutationResult } from "react-query";
import axios from "axios";

export interface SubProductData {
  categoryId: number;
  productName: string;
  productDescription: string;
  productImage: File;
  productActive: boolean;
  productSequence: number;
  productFilterlist: string;
}

const createSubProduct = async (SubproductData: SubProductData): Promise<object> => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL as string}/subProduct/createSubProduct`,
      SubproductData
    );
    return response.data as object;
  } catch (error) {
    throw new Error("Failed to create SubProduct");
  }
};

const useCreateSubProduct = (): UseMutationResult<any, Error, SubProductData> => {
  return useMutation(createSubProduct);
};

export default useCreateSubProduct;
