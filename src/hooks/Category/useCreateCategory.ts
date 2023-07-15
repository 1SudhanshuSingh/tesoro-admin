import { useMutation, UseMutationResult } from "react-query";
import axios from "axios";

export interface CategoryData {
  CategoryId: number;
  CategoryName: string;
  CategoryDescription: string;
  CategoryImage: File;
  CategoryActive: boolean;
  CategorySequence: number;
  CategoryFilterlist: string;
}

const createCategory = async (CategoryData: CategoryData): Promise<object> => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL as string}/Category/createCategory`,
      CategoryData
    );
    return response.data as object;
  } catch (error) {
    throw new Error("Failed to create Category");
  }
};

const useCreateCategory = (): UseMutationResult<any, Error, CategoryData> => {
  return useMutation(createCategory);
};

export default useCreateCategory;
