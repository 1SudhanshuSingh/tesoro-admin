import { useQuery } from "react-query";
import axios from "axios";

interface Item {
  row: number;
  itemID: number;
  item_qty: number;
  item_sku: string;
  item_price: number;
  item_active: string;
  item_images: string[];
  item_subprodID: number;
  item_filterValues: { filter_optionID: number; filter_optionName: string }[];
}

interface ApiResponse {
  output: number;
  message: string;
  jsonResponse: Item[];
  status: number;
}

interface FetchItemsOptions {
  subProdId: number;
  maxItemId?: number;
  limit?: number;
}

async function fetchItems(options: FetchItemsOptions): Promise<Item[]> {
  const { subProdId, maxItemId, limit } = options;
  const queryParams = new URLSearchParams();

  queryParams.append("subProdId", subProdId.toString());

  if (maxItemId === 0) {
    queryParams.append("maxItemId", maxItemId.toString());
  }

  if (limit) {
    queryParams.append("limit", limit.toString());
  }

  const response = await axios.post<ApiResponse>(
    `${
        import.meta.env.VITE_API_BASE_URL as string
      }/item/getAllItemsThruSubProdId`,
    queryParams
  );

  if (response.status !== 200) {
    throw new Error("Failed to fetch items");
  }

  const jsonResponse = response.data.jsonResponse;
  if (!jsonResponse || !Array.isArray(jsonResponse)) {
    throw new Error("Invalid response data: jsonResponse is null or not an array");
  }

  const itemsWithIds = jsonResponse.map((item) => ({
    ...item,
    id: item.itemID,
  }));

  return itemsWithIds;
}

export function useGetItems(
  subProdId: number,
  maxItemId?: number,
  limit?: number
) {
  return useQuery<Item[], Error>(
    ["items", subProdId, maxItemId, limit],
    () => fetchItems({ subProdId, maxItemId, limit })
  );
}
