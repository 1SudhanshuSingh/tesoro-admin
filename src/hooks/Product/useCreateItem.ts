import { useMutation, UseMutationResult } from "react-query";
import axios from "axios";

export interface ItemData {
  categoryId: number;
  ItemName: string;
  ItemDescription: string;
  ItemImage: File;
  ItemActive: boolean;
  ItemSequence: number;
  ItemFilterlist: string;
}

const createItem = async (ItemData: ItemData): Promise<object> => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL as string}/Item/createItem`,
      ItemData
    );
    return response.data as object;
  } catch (error) {
    throw new Error("Failed to create Item");
  }
};

const useCreateItem = (): UseMutationResult<any, Error, ItemData> => {
  return useMutation(createItem);
};

export default useCreateItem;
