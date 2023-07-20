import axios, { AxiosResponse } from "axios";
import { useQuery } from "react-query";

interface Product {
  id: string;
  prod_catID: number;
  prod_active: string;
  prod_name: string;
  prod_type: { id: number; value: string }[];
  prod_sequence: number;
  prod_filterList: { id: number; value: string }[];
}

interface ProductResponse {
  output: number,
  message: string,
  jsonResponse: Product[],
}
interface FetchProductsOptions {
  catId?: number;
  maxProdId?: number;
  limit?: number;
}

async function fetchProducts(
  options: FetchProductsOptions
): Promise<ProductResponse[]> {
  const { catId, maxProdId, limit } = options;

  try {
    const response: AxiosResponse<ProductResponse[]> = await axios.post(
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
  return useQuery<ProductResponse[], Error>(["products", catId, maxProdId, limit], () =>
    fetchProducts({ catId, maxProdId, limit })
  );
}
