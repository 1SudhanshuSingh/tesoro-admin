import { useQuery } from "react-query";
import axios from "axios";

interface AllSubProduct {
  subprodID: number;
  subprod_Name: string;
  subprod_image: string;
  subprod_active: string;
  subprod_prodID: number[];
  subprod_filterList: number[];
  subprod_filterValues: number[];
}

interface ApiResponse {
  output: number;
  message: string;
  jsonResponse: AllSubProduct[];
  status: number;
}

interface FetchSubAllProductsOptions {
  prodId?: number;
  maxSubprodId?: number;
  limit?: number;
}

async function fetchAllSubProducts(
  options: FetchSubAllProductsOptions
): Promise<ApiResponse> {
  const { prodId, maxSubprodId, limit } = options;
  const queryParams = new URLSearchParams();

  if (prodId) {
    queryParams.append("prodId", prodId.toString());
  }
  if (maxSubprodId === 0) {
    queryParams.append("maxSubprodId", maxSubprodId.toString());
  }
  if (limit) {
    queryParams.append("limit", limit.toString());
  }

  const response = await axios.post<ApiResponse>(
    `${
      import.meta.env.VITE_API_BASE_URL as string
    }/subProduct/getAllSubProdThruProdId`,
    queryParams
  );

  if (response.status !== 200) {
    throw new Error("Failed to fetch subproducts");
  }

  return response.data;
}

export const useGetAllSubproduct = (
  prodId?: number,
  maxSubprodId?: number,
  limit?: number
) => {
  const { data, isLoading, error } = useQuery<ApiResponse, Error>(
    ["allSubProducts", prodId, maxSubprodId, limit],
    () => fetchAllSubProducts({ prodId, maxSubprodId, limit })
  );
  const allSubProductsData = data?.jsonResponse?.map((subProd) => ({
    ...subProd,
    id: subProd.subprodID,
  })) || [];

  return { allSubProductsData, isLoading, error };
};
