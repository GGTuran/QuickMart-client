import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../Loading/Loading";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/redux/features/product/productApi";
import { useGetAllCategoryQuery } from "@/redux/features/category/categoryApi";

const UpdateProductModal = ({ id }: { id: string }) => {
  const { data: productData } = useGetProductByIdQuery(id);
  const product = productData?.data;

  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price || "");
  const [inventoryCount, setInventoryCount] = useState(
    product?.inventoryCount || ""
  );
  const [image, setImage] = useState<File | null>(null);
  const [category, setCategory] = useState(product?.category || "");
  const [discount, setDiscount] = useState(product?.discount || "");

  // console.log(product, "from update modal");

  const { data: categories, isLoading: isCategoriesLoading } =
    useGetAllCategoryQuery("");

  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Prepare the updated product data
    const updatedProductData = {
      name: name || product.name,
      description: description || product.description,
      price: parseFloat(price) || product.price,
      inventoryCount: parseInt(inventoryCount, 10) || product.inventoryCount,
      category: category || product.category,
      discount: parseFloat(discount || product.discount || "0"),
    };

    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(updatedProductData));
      if (image) formData.append("image", image);

      await updateProduct({ id: product._id, productInfo: formData }).unwrap();

      toast.success("Product updated successfully!");
    } catch (error) {
      toast.error("Error updating product. Please try again.");
      console.error("Error updating product:", error);
    }
  };

  if (isLoading || isCategoriesLoading) return <Loading />;

  return (
    <div>
      <Toaster />
      <Dialog>
        <DialogTrigger asChild>
          <button className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-500 transition-colors duration-300">
            Update
          </button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Product</DialogTitle>
            <DialogDescription>Update the product details</DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit} encType="multipart/form-data">
            <div className="grid gap-4 py-4">
              {/* Name Field */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  value={name}
                  placeholder={product?.name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  className="col-span-3"
                />
              </div>

              {/* Description Field */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  value={description}
                  placeholder={product?.description}
                  onChange={(e) => setDescription(e.target.value)}
                  id="description"
                  className="col-span-3"
                />
              </div>

              {/* Price Field */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input
                  value={price}
                  placeholder={product?.price}
                  onChange={(e) => setPrice(e.target.value)}
                  id="price"
                  className="col-span-3"
                  type="number"
                  step="0.01"
                />
              </div>

              {/* Inventory Count Field */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="inventoryCount" className="text-right">
                  Inventory Count
                </Label>
                <Input
                  value={inventoryCount}
                  placeholder={product?.inventoryCount}
                  onChange={(e) => setInventoryCount(e.target.value)}
                  id="inventoryCount"
                  className="col-span-3"
                  type="number"
                />
              </div>

              {/* Image Upload Field */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Image
                </Label>
                <Input
                  type="file"
                  onChange={(e) =>
                    setImage(e.target.files ? e.target.files[0] : null)
                  }
                  id="image"
                  className="col-span-3"
                />
              </div>

              {/* Category Dropdown */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="col-span-3 border rounded-md p-2"
                >
                  <option value="">Select Category</option>
                  {categories?.data?.map((category: any) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Discount Field */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="discount" className="text-right">
                  Discount (%)
                </Label>
                <Input
                  value={discount}
                  placeholder={product?.discount || "0"}
                  onChange={(e) => setDiscount(e.target.value)}
                  id="discount"
                  className="col-span-3"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <DialogClose asChild>
                <button
                  className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-500 transition-colors duration-300"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save"}
                </button>
              </DialogClose>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProductModal;
