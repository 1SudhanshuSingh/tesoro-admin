import { useMutation, MutationFunction, MutationKey } from "react-query";
import axios, { AxiosResponse } from "axios";

interface Option {
  Option_id: number;
  Option_name: string;
  row: number;
}

interface CreateMasterOptionRequest {
  OptionName: string;
  OptionOptions: string; // Adjust the type according to your requirements
}

const useCreateMasterOption = (): {
  createMasterOption: MutationFunction<
    AxiosResponse<Option, unknown>,
    CreateMasterOptionRequest
  >;
  // data: Option | null;
  data: AxiosResponse<Option, unknown> | null;
  isLoading: boolean;
} => {
  const endpoint = `${
    import.meta.env.VITE_API_BASE_URL as string
  }/Option/createMasterOption`;

  const createMasterOption: MutationFunction<
    AxiosResponse<Option, unknown>,
    CreateMasterOptionRequest
  > = async (OptionData) => {
    const response = await axios.post<
      CreateMasterOptionRequest,
      AxiosResponse<Option, unknown>
    >(endpoint, OptionData);
    return response;
  };

  const {
    mutate: createMasterOptionMutation,
    data = null,
    isLoading,
  } = useMutation<
    AxiosResponse<Option, unknown>,
    unknown,
    CreateMasterOptionRequest,
    MutationKey
  >(createMasterOption);

  return {
    createMasterOption: createMasterOptionMutation as MutationFunction<
      AxiosResponse<Option, unknown>,
      CreateMasterOptionRequest
    >,
    data,
    isLoading,
  };
};

export default useCreateMasterOption;
