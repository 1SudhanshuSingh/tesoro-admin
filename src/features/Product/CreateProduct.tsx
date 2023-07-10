import useCreateProduct from "../../hooks/Product/useCreateProduct";

const CreateProduct: React.FC = () => {
  const createProductMutation = useCreateProduct();
  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const productData = {
      categoryId: formData.get("categoryId") as string,
      productName: formData.get("productName") as string,
      productDescription: formData.get("productDescription") as string,
      productImage: formData.get("productImage") as File,
      productActive: Boolean(formData.get("productActive")),
      productSequence: Number(formData.get("productSequence")),
      productFilterlist: formData.get("productFilterlist") as string,
    };
    createProductMutation.mutate(productData);
  };
  return (
    <div>
      <h3>Create Product</h3>
    </div>
  );
};

export default CreateProduct;
