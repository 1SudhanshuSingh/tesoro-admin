import { useMutation, UseMutationResult } from "react-query";
import axios from "axios";

export interface ItemData {
  subProdId: number;
  ItemSku: string;
  ItemQty: number;
  ItemActive: boolean;
  ItemPrice: number;
  ItemImage: File[];
  ItemFilterValues: string[];
  ItemDetail: string;
}

const createItem = async (ItemData: ItemData): Promise<object> => {
  console.log("from use:", ItemData?.ItemImage);
  try {
    const formData = new FormData();
    formData.append("subProdId", ItemData.subProdId.toString());
    formData.append("ItemQty", ItemData.ItemQty.toString());
    formData.append("ItemSku", ItemData.ItemSku);
    formData.append("ItemDetail", ItemData.ItemDetail);
    Array.from(ItemData.ItemImage).forEach((file, index) => {
      formData.append(`ItemImage`, file);
    });
    // ItemData.ItemImage.forEach((image, index) => {
    //   formData.append(`ItemImage${index + 1}`, image);
    // });

    formData.append("ItemActive", ItemData.ItemActive.toString().slice(0, 1));
    formData.append("ItemPrice", ItemData.ItemPrice.toString());
    // Append each ItemFilterValue individually
    ItemData.ItemFilterValues.forEach((value, index) => {
      formData.append(`ItemFilterValues[${index}]`, value);
    });
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL as string}/item/createItem`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
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
