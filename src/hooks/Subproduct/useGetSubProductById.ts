import { useQuery } from "react-query";
import axios from "axios";

interface SubProductById {
  subprodID: number;
  subprod_Name: string;
  subprod_image: string;
  subprod_active: string;
  subprod_prodID: number[];
  subprod_filterList: {
    filter_id: number;
    filter_name: string;
  }[];
  subprod_filterValues: {
    filter_optionID: number;
    filter_optionName: string;
  }[];
}

interface ApiResponse {
  output: number;
  message: string;
  jsonResponse: SubProductById;
  status: number;
}

const useGetSubProduct = (subProdId: number) => {
  return useQuery<SubProductById, Error>(
    ["subProduct", subProdId],
    () =>
      axios.post<ApiResponse>(
        `${import.meta.env.VITE_API_BASE_URL as string}/subProduct/getSubProduct`,
        { subProdId }
      ).then((response) => response.data.jsonResponse),
  );
};

export default useGetSubProduct;