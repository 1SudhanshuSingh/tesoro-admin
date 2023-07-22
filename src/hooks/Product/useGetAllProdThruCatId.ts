import axios, { AxiosResponse } from "axios";
import { useQuery } from "react-query";

export interface FilterListItem {
  filter_id: number;
  filter_name: string;
}
export interface Product {
  row: number;
  prodID: number;
  prod_name: string;
  prod_catID: number;
  prod_image: string | null;  
  prod_active: "A" | "I" | "S";// prod_active: string;
  prod_sequence: number | null;// prod_sequence: number;
  prod_filterList: FilterListItem[];
  prod_description: string;
}

export interface ProductResponse {
  output: number,
  message: string,
  jsonResponse: Product[],
}
export interface FetchProductsOptions {
  catId?: number;
  maxProdId?: number;
  limit?: number;
}

async function fetchProducts(
  options: FetchProductsOptions
): Promise<ProductResponse> {
  const { catId, maxProdId, limit } = options;

  try {
    const response: AxiosResponse<ProductResponse> = await axios.post(
      `${
        import.meta.env.VITE_API_BASE_URL as string
      }/product/getAllProdThruCatId`,
      {
        catId,
        maxProdId,
        limit,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch products");
  }
}

export function useProducts(
  catId?: number,
  maxProdId?: number,
  limit?: number
) {
  return useQuery<ProductResponse, Error>(["products", catId, maxProdId, limit], () =>
    fetchProducts({ catId, maxProdId, limit })
  );
}
