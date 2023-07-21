import { useMutation, MutationFunction, MutationKey } from "react-query";
import axios, { AxiosResponse } from "axios";

interface Filter {
  filter_id: number;
  filter_name: string;
  row: number;
}

interface CreateMasterFilterRequest {
  filterName: string;
  filterOptions: string; // Adjust the type according to your requirements
}

const useCreateMasterFilter = (): {
  createMasterFilter: MutationFunction<
    AxiosResponse<Filter, unknown>,
    CreateMasterFilterRequest
  >;
  data: AxiosResponse<Filter, unknown> | null;
  isLoading: boolean;
} => {
  const endpoint = `${
    import.meta.env.VITE_API_BASE_URL as string
  }/filter/createMasterFilter`;

  const createMasterFilter: MutationFunction<
    AxiosResponse<Filter, unknown>,
    CreateMasterFilterRequest
  > = async (filterData) => {
    const response = await axios.post<
      CreateMasterFilterRequest,
      AxiosResponse<Filter, unknown>
    >(endpoint, filterData);
    return response;
  };

  const {
    mutate: createMasterFilterMutation,
    data = null,
    isLoading,
  } = useMutation<
    AxiosResponse<Filter, unknown>,
    unknown,
    CreateMasterFilterRequest,
    MutationKey
  >(createMasterFilter);

  return {
    createMasterFilter: createMasterFilterMutation as MutationFunction<
      AxiosResponse<Filter, unknown>,
      CreateMasterFilterRequest
    >,
    data,
    isLoading,
  };
};

export default useCreateMasterFilter;
