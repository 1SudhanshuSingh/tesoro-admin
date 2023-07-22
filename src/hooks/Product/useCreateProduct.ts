import { useMutation, UseMutationResult } from "react-query";
import axios from "axios";

export interface ProductData {
  categoryId: number;
  productName: string;
  productDescription: string;
  productImage: File | null;
  productActive: boolean;
  productSequence: number;
  productFilterList: number[];
}

const createProduct = async (productData: ProductData): Promise<object> => {
  console.log(productData);
  try {
    const formData = new FormData();
    formData.append("categoryId", productData.categoryId.toString());
    formData.append("productName", productData.productName);
    formData.append("productDescription", productData.productDescription);

    if (productData.productImage) {
      formData.append("productImage", productData.productImage);
    }
    formData.append("productActive", productData.productActive.toString());
    formData.append("productSequence", productData.productSequence.toString());
    formData.append(
      "productFilterList",
      JSON.stringify(productData.productFilterList)
    );

    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL as string}/product/createProduct`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data as object;
  } catch (error) {
    throw new Error("Failed to create product");
  }
};

const useCreateProduct = (): UseMutationResult<any, Error, ProductData> => {
  return useMutation(createProduct);
};

export default useCreateProduct;
