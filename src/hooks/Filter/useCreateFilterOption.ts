import { useMutation, MutationFunction, MutationKey } from "react-query";
import axios, { AxiosResponse } from "axios";

export interface FilterOption {
  FilterOption_id: number;
  FilterOption_name: string;
  row: number;
}

interface CreateFilterOptionRequest {
  optionName: string;
}

const useCreateFilterOption = (): {
  createFilterOption: MutationFunction<
    AxiosResponse<FilterOption, unknown>,
    CreateFilterOptionRequest
  >;
  // data: FilterOption | null;
  data: AxiosResponse<FilterOption, unknown> | null;
  isLoading: boolean;
} => {
  const endpoint = `${
    import.meta.env.VITE_API_BASE_URL as string
  }/filter/createFilterOption`;

  const createFilterOption: MutationFunction<
    AxiosResponse<FilterOption, unknown>,
    CreateFilterOptionRequest
  > = async (FilterOptionData) => {
    const response = await axios.post<
      CreateFilterOptionRequest,
      AxiosResponse<FilterOption, unknown>
    >(endpoint, FilterOptionData);
    return response;
  };

  const {
    mutate: createFilterOptionMutation,
    data = null,
    isLoading,
  } = useMutation<
    AxiosResponse<FilterOption, unknown>,
    unknown,
    CreateFilterOptionRequest,
    MutationKey
  >(createFilterOption);

  return {
    createFilterOption: createFilterOptionMutation as MutationFunction<
      AxiosResponse<FilterOption, unknown>,
      CreateFilterOptionRequest
    >,
    data,
    isLoading,
  };
};

export default useCreateFilterOption;
