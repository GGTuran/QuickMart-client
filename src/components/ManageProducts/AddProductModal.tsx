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
import { useAddProductMutation } from "@/redux/features/product/productApi";
import { useGetAllCategoryQuery } from "@/redux/features/category/categoryApi";
import { useGetShopByVendorIdQuery } from "@/redux/features/shop/shopApi";
import { useGetProfileQuery } from "@/redux/features/user/userApi";

const AddProductModal = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [inventoryCount, setInventoryCount] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [category, setCategory] = useState<string>("");
  const [discount, setDiscount] = useState("");

  const { data: categories, isLoading: isCategoriesLoading } =
    useGetAllCategoryQuery("");

  const { data } = useGetProfileQuery("", {
    pollingInterval: 30000,
  });

  const person = data?.data;

  const { data: shopByVendor } = useGetShopByVendorIdQuery(person?._id);
  const shop = shopByVendor?.data;

  const [addProduct, { isLoading }] = useAddProductMutation();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (
      !name.trim() ||
      !description.trim() ||
      !price ||
      !inventoryCount ||
      !category ||
      !image
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    // Prepare the product data
    const productData = {
      name,
      description,
      price: parseFloat(price),
      inventoryCount: parseInt(inventoryCount, 10),
      category,
      discount: parseFloat(discount || "0"), // Default discount is 0 if not specified
      shopId: shop?._id,
      image,
    };

    console.log(productData, "product data");
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(productData));
      formData.append("image", image);

      await addProduct(formData).unwrap();

      // Reset form after successful submission
      setName("");
      setDescription("");
      setPrice("");
      setInventoryCount("");
      setCategory("");
      setDiscount("");
      setImage(null);
      toast.success("Product added successfully!");
    } catch (error) {
      toast.error("Error adding product. Please try again.");
      console.error("Error adding product:", error);
    }
  };

  if (isLoading || isCategoriesLoading) return <Loading />;

  return (
    <div>
      <Toaster />
      <Dialog>
        <DialogTrigger asChild>
          <button className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-500 transition-colors duration-300">
            Add Product
          </button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Product</DialogTitle>
            <DialogDescription>Add a new product</DialogDescription>
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
                  {categories?.data?.map((category) => (
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

export default AddProductModal;
