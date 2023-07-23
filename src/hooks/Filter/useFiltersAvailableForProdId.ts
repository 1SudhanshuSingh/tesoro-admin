import { useEffect } from "react";
import { useQuery, QueryFunction, QueryKey } from "react-query";
import axios, { AxiosResponse } from "axios";

export interface Filter {
  filter_id: number;
  filter_name: string;
  row: number;
}

interface GetAllFiltersAvailableForProdIdResponse {
  jsonResponse: Filter[];
  output: number;
  message: string;
}

const useFiltersAvailableForProdId = (
  prodId: number
): {
  isLoading: boolean;
  filterData: Filter[] | null;
  refetch: () => Promise<void>;
} => {
  const endpoint = `${
    import.meta.env.VITE_API_BASE_URL as string
  }/filter/getAllFilterAvailableForProdId`;
  const params = {
    // prodID: prodId,changed thisD
    prodId: prodId,
    // maxFilterID: 0, changed this
    maxFilterId: 0,
    limit: 100,
  };

  const fetchFilters: QueryFunction<
    AxiosResponse<GetAllFiltersAvailableForProdIdResponse, unknown>,
    QueryKey
  > = async () => {
    const response = await axios.post<
      GetAllFiltersAvailableForProdIdResponse,
      AxiosResponse<GetAllFiltersAvailableForProdIdResponse, unknown>
    >(endpoint, { params });
    // >(endpoint, { ...params }); changed this
    return response;
  };

  const {
    isLoading,
    data: filterData = null,
    refetch,
  } = useQuery<
    AxiosResponse<GetAllFiltersAvailableForProdIdResponse, unknown>,
    unknown,
    Filter[]
  >(["filters", prodId], fetchFilters, {
    enabled: false, // Fetch is disabled by default and needs to be triggered manually
    select: (response) => response.data?.jsonResponse ?? null,
  });

  useEffect(() => {
    void refetch();
  }, [prodId, refetch]);

  return {
    isLoading,
    filterData,
    refetch: refetch as unknown as () => Promise<void>,
  };
};

export default useFiltersAvailableForProdId;
