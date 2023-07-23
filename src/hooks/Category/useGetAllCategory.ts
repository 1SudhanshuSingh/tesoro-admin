import axios from "axios";
import { useQuery } from "react-query";

export type Category = {
  row: number;
  cat_name: string;
  parent_categoryID: number;
  categoryID: number;
};

export type CategoryResponse = {
  output: number;
  message: string;
  jsonResponse: Category[];
};

async function fetchCategories(): Promise<CategoryResponse> {
  const response = await axios.get<CategoryResponse>(
    `${import.meta.env.VITE_API_BASE_URL as string}/category/getAllCategory`
  );
  if (!response.data) {
    throw new Error("Failed to fetch categories");
  }
  return response.data;
}

export function useCategories() {
  return useQuery<CategoryResponse, Error>("categories", fetchCategories);
}
/*
import axios from "axios";
import { useQuery } from "react-query";

export type Category = {
  row: number;
  cat_name: string;
  parent_categoryID: number;
  categoryID: number;
};
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
/*import { useEffect } from "react";
import { useQuery, QueryFunction, QueryKey } from "react-query";
import axios, { AxiosResponse } from "axios";

export interface CategoryList {
  categoryID: number;
  parent_categoryID: number;
  cat_name: string;
  row: number;
}

interface GetAllCategory {
  jsonResponse: CategoryList[];
  output: number;
  message: string;
}

const useGetAllCategory = (
  catID: number
): {
  isLoading: boolean;
  CategoryListData: CategoryList[] | null;
  refetch: () => Promise<void>;
} => {
  const endpoint = `${
    import.meta.env.VITE_API_BASE_URL as string
  }/category/getCategory`;
  const params = {
    catID: catID,
  };

  const fetchCategoryLists: QueryFunction<
    AxiosResponse<GetAllCategory, unknown>,
    QueryKey
  > = async () => {
    const response = await axios.post<
      GetAllCategory,
      AxiosResponse<GetAllCategory, unknown>
    >(endpoint, { params });
    return response;
  };

  const {
    isLoading,
    data: CategoryListData = null,
    refetch,
  } = useQuery<AxiosResponse<GetAllCategory, unknown>, unknown, CategoryList[]>(
    ["CategoryLists", catID],
    fetchCategoryLists,
    {
      enabled: false, // Fetch is disabled by default and needs to be triggered manually
      select: (response) => response.data?.jsonResponse ?? null,
    }
  );

  useEffect(() => {
    void refetch();
  }, [catID, refetch]);

  return {
    isLoading,
    CategoryListData,
    refetch: refetch as unknown as () => Promise<void>,
  };
};

export default useGetAllCategory;
*/
