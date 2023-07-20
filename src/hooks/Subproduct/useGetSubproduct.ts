import { useQuery } from "react-query";
import axios from "axios";

interface SubProduct {
  id: number; 
  row: number;
  subprodID: number;
  subprod_Name: string;
  subprod_image: string;
  subprod_active: string;
  subprod_prodID: { prodID: number; prod_name: string }[];
  subprod_filterList: { filter_id: number; filter_name: string }[];
  subprod_filterValues: {
    filter_optionID: number;
    filter_optionName: string;
  }[];
}

interface ApiResponse {
  output: number;
  message: string;
  jsonResponse: SubProduct[];
  status: number;
}

interface FetchSubProductsOptions {
  prodId?: number;
  maxSubprodId?: number;
  limit?: number;
}

async function fetchSubProducts(
  options: FetchSubProductsOptions
): Promise<SubProduct[]> {
  const { prodId, maxSubprodId, limit } = options;
  const queryParams = new URLSearchParams();

  if (prodId) {
    queryParams.append("prodId", prodId.toString());
  }
  if(maxSubprodId === 0){
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

  return response.data.jsonResponse;
}

export const useGetSubproduct = (
  prodId: number,
  maxSubprodId: number,
  limit: number
) => {
  const { data, isLoading, error } = useQuery<SubProduct[], Error>(
    ["subProducts", prodId, maxSubprodId, limit],
    () => fetchSubProducts({ prodId, maxSubprodId, limit })
  );
  const subProductsData = data?.map((subProd) => ({
    ...subProd,
    id: subProd.row,
  })) || [];

  return { subProductsData, isLoading, error };
};
