import axios from "axios";
import { useQuery } from "react-query";

export type Category = {
  row: number;
  cat_name: string;
  parent_categoryID: number;
}
export type CategoryResponse = {
  output: number;
  message: string;
  jsonResponse: Category[];
};

async function fetchCategories(): Promise<CategoryResponse[]> {
  const response = await axios(
    `${import.meta.env.VITE_API_BASE_URL as string}/category/getAllCategory`
  );
  if (!response) {
    throw new Error("Failed to fetch categories");
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  return (await response.data) as CategoryResponse[];
}

export function useCategories() {
  return useQuery<CategoryResponse[], Error>("categories", fetchCategories);
}
