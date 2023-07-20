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
    subProdId?: number;
}

async function fetchAllSubProducts(
  options: FetchSubAllProductsOptions
): Promise<AllSubProduct[]> {
  const { subProdId } = options;
  const queryParams = new URLSearchParams();

  if (subProdId === 0) {
    queryParams.append("subProdId", subProdId.toString());
  }

  const response = await axios.post<ApiResponse>(
    `${
      import.meta.env.VITE_API_BASE_URL as string
    }/subproduct/getAllSubProduct`,
    queryParams
  );

  if (response.status !== 200) {
    throw new Error("Failed to fetch subproducts");
  }

  return response.data.jsonResponse;
}

export const useGetAllSubproduct = (
    subProdId?: number,
) => {
  const { data, isLoading, error } = useQuery<AllSubProduct[], Error>(
    ["allSubProducts", subProdId],
    () => fetchAllSubProducts({ subProdId })
  );
  const allSubProductsData = data?.map((subProd) => ({
    ...subProd,
    id: subProd.subprodID,
  })) || [];

  return { allSubProductsData, isLoading, error };
};
