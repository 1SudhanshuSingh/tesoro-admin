import { useEffect } from "react";
import { useQuery, QueryFunction, QueryKey } from "react-query";
import axios, { AxiosResponse } from "axios";

export interface Option {
  Option_id: number;
  Option_name: string;
  row: number;
}

interface GetAllOptionsAvailableForProdIdResponse {
  jsonResponse: Option[];
  output: number;
  message: string;
}

const useOptionsAvailableForProdId = (
  prodId: number
): {
  isLoading: boolean;
  OptionData: Option[] | null;
  refetch: () => Promise<void>;
} => {
  const endpoint = `${
    import.meta.env.VITE_API_BASE_URL as string
  }/Option/getAllOptionAvailableForProdId`;
  const params = {
    prodId: prodId,
    maxOptionId: 0,
    limit: 100,
  };

  const fetchOptions: QueryFunction<
    AxiosResponse<GetAllOptionsAvailableForProdIdResponse, unknown>,
    QueryKey
  > = async () => {
    const response = await axios.post<
      GetAllOptionsAvailableForProdIdResponse,
      AxiosResponse<GetAllOptionsAvailableForProdIdResponse, unknown>
    >(endpoint, { params });
    return response;
  };

  const {
    isLoading,
    data: OptionData = null,
    refetch,
  } = useQuery<
    AxiosResponse<GetAllOptionsAvailableForProdIdResponse, unknown>,
    unknown,
    Option[]
  >(["Options", prodId], fetchOptions, {
    enabled: false, // Fetch is disabled by default and needs to be triggered manually
    select: (response) => response.data?.jsonResponse ?? null,
  });

  useEffect(() => {
    void refetch();
  }, [prodId, refetch]);

  return {
    isLoading,
    OptionData,
    refetch: refetch as unknown as () => Promise<void>,
  };
};

export default useOptionsAvailableForProdId;

// import { useEffect } from "react";
// import { useQuery, QueryFunction, QueryKey } from "react-query";
// import axios, { AxiosResponse } from "axios";

// export interface Option {
//   Option_id: number;
//   Option_name: string;
//   row: number;
// }

// interface GetAllOptionOptionsAvailableForOptionIDResponse {
//   jsonResponse: Option[];
//   output: number;
//   message: string;
// }

// const useOptionsAvailableForProdId = (
//   prodId: number
// ): {
//   isLoading: boolean;
//   OptionData: Option[] | null;
//   refetch: () => Promise<void>;
// } => {
//   const endpoint = `${
//     import.meta.env.VITE_API_BASE_URL as string
//   }/Option/getAllOptionAvailableForProdId`;
//   const params = {
//     prodId: prodId,
//     maxOptionId: 0,
//     limit: 100,
//   };

//   const fetchOptions: QueryFunction<
//     AxiosResponse<GetAllOptionOptionsAvailableForOptionIDResponse, unknown>,
//     QueryKey
//   > = async () => {
//     const response = await axios.post<
//       GetAllOptionOptionsAvailableForOptionIDResponse,
//       AxiosResponse<GetAllOptionOptionsAvailableForOptionIDResponse, unknown>
//     >(endpoint, { params });
//     return response;
//   };

//   const {
//     isLoading,
//     data: OptionData = null,
//     refetch,
//   } = useQuery<
//     AxiosResponse<GetAllOptionOptionsAvailableForOptionIDResponse, unknown>,
//     unknown,
//     Option[]
//   >(["Options", prodId], fetchOptions, {
//     enabled: false, // Fetch is disabled by default and needs to be triggered manually
//     select: (response) => response.data?.jsonResponse ?? null,
//   });

//   useEffect(() => {
//     void refetch();
//   }, [prodId, refetch]);

//   return {
//     isLoading,
//     OptionData,
//     refetch: refetch as unknown as () => Promise<void>,
//   };
// };

// export default useOptionsAvailableForProdId;
