/*import { useEffect, useState } from "react";
import { useQuery, QueryFunction, QueryKey } from "react-query";
import axios, { AxiosResponse } from "axios";

export interface Master {
  filter_id: number;
  filter_name: string;
  filter_options: number[];
}

interface UpdateMasterFilterResponse {
  jsonResponse: Master[];
  output: number;
  message: string;
}

interface filterOptionList {
  filterId: number;
  filterName: string;
  filterOption: number[];
}

const useUpdateMasterFilterOrOption = (
  filterOptionList: filterOptionList | null
): {
  isLoading: boolean;
  MasterData: Master[] | null;
  isParamsInitialized: boolean;
  refetch: () => Promise<void>;
} => {
  const [isParamsInitialized, setIsParamsInitialized] = useState(false);

  const endpoint = `${
    import.meta.env.VITE_API_BASE_URL as string
  }/filter/updateMasterFilter`;

  // Check if filterOptionList is fully initialized (not null and has required properties)
  useEffect(() => {
    if (
      filterOptionList &&
      filterOptionList.filterId &&
      filterOptionList.filterName &&
      filterOptionList.filterOption
    ) {
      setIsParamsInitialized(true);
    } else {
      setIsParamsInitialized(false);
    }
  }, [filterOptionList]);

  // If the filterOptionList is not fully initialized, return the initial state.
  if (!isParamsInitialized) {
    return {
      isLoading: false,
      MasterData: null,
      isParamsInitialized: false,
      refetch: async () => {},
    };
  }

  const params = {
    filterId: filterOptionList!.filterId,
    filterName: filterOptionList!.filterName,
    filterOption: filterOptionList!.filterOption,
    // limit: 100,
  };

  const fetchMasters: QueryFunction<
    AxiosResponse<UpdateMasterFilterResponse, unknown>,
    QueryKey
  > = async () => {
    const response = await axios.post<
      UpdateMasterFilterResponse,
      AxiosResponse<UpdateMasterFilterResponse, unknown>
    >(endpoint, { params });
    return response;
  };

  const {
    isLoading,
    data: MasterData = null,
    refetch,
  } = useQuery<
    AxiosResponse<UpdateMasterFilterResponse, unknown>,
    unknown,
    Master[]
  >(["Masters", params.filterId, params.filterName, params.filterOption], fetchMasters, {
    enabled: false, // Fetch is disabled by default and needs to be triggered manually
    select: (response) => response.data?.jsonResponse ?? null,
  });

  useEffect(() => {
    void refetch();
  }, [params.filterId, params.filterName, params.filterOption, refetch]);

  return {
    isLoading,
    MasterData,
    isParamsInitialized,
    refetch: refetch as unknown as () => Promise<void>,
  };
};

export default useUpdateMasterFilterOrOption;
*/
import { useEffect } from "react";
import { useQuery, QueryFunction, QueryKey } from "react-query";
import axios, { AxiosResponse } from "axios";

export interface Master {
  filter_id: number;
  filter_name: string;
  filter_options: number[];
}

interface UpdateMasterFilterResponse {
  jsonResponse: Master[];
  output: number;
  message: string;
}

interface FilterOptionList {
  filterId: number | null;
  filterName: string | null;
  filterOption: number[] | [];
}

const useUpdateMasterFilterOrOption = (
  filterOptionList: FilterOptionList
): {
  isLoading: boolean;
  MasterData: Master[] | null;
  refetch: () => Promise<void>;
} => {
  const endpoint = `${
    import.meta.env.VITE_API_BASE_URL as string
  }/filter/updateMasterFilter`;

  // Flag to track whether the filter options are fully initialized
  const areFilterOptionsInitialized =
    filterOptionList.filterId !== null &&
    filterOptionList.filterName !== null &&
    filterOptionList.filterOption.length !== 0;

  const params = {
    filterId: filterOptionList.filterId,
    filterName: filterOptionList.filterName,
    filterOption: filterOptionList.filterOption,
    // limit: 100,
  };

  const fetchMasters: QueryFunction<
    AxiosResponse<UpdateMasterFilterResponse, unknown>,
    QueryKey
  > = async () => {
    const response = await axios.post<
      UpdateMasterFilterResponse,
      AxiosResponse<UpdateMasterFilterResponse, unknown>
    >(endpoint, { params });
    return response;
  };

  const {
    isLoading,
    data: MasterData = null,
    refetch,
  } = useQuery<
    AxiosResponse<UpdateMasterFilterResponse, unknown>,
    unknown,
    Master[]
  >(
    ["Masters", params.filterId, params.filterName, params.filterOption],
    fetchMasters,
    {
      enabled: false, // Fetch is disabled by default and needs to be triggered manually
      select: (response) => response.data?.jsonResponse ?? null,
    }
  );

  useEffect(() => {
    // Check if the filter options are fully initialized and refetch when needed
    if (areFilterOptionsInitialized) {
      void refetch();
    }
  }, [areFilterOptionsInitialized, refetch]);

  return {
    isLoading,
    MasterData,
    refetch: refetch as unknown as () => Promise<void>,
  };
};

export default useUpdateMasterFilterOrOption;
