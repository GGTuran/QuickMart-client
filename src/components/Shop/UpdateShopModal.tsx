import { Button } from "@/components/ui/button";
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
import {
  useGetShopByIdQuery,
  useGetShopByVendorIdQuery,
  useUpdateShopMutation,
} from "@/redux/features/shop/shopApi";

import { Toaster, toast } from "react-hot-toast";
import { useState, FormEvent } from "react";
import { TShop } from "@/types/shop.interface";

const UpdateShopModal = ({ id }: { id: string }) => {
  const { data: shopData } = useGetShopByIdQuery(id);
  const shop = shopData?.data;

  const [name, setName] = useState(shop?.name || "");
  const [description, setDescription] = useState(shop?.description || "");
  const [logo, setLogo] = useState<File | null>(null);

  const [updateShop, { isLoading }] = useUpdateShopMutation();

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();

    const updatedShopData: Partial<TShop> = {
      name: name || shop.name,
      description: description || shop.description,
    };

    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(updatedShopData));
      if (logo) formData.append("image", logo);

      await updateShop({ id: shop._id!, shopInfo: formData }).unwrap();

      toast.success("Shop updated successfully!");
    } catch (error) {
      toast.error("Error updating shop. Please try again.");
      console.error("Error updating shop:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Update Shop</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Shop</DialogTitle>
          <DialogDescription>Modify your shop details below</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleUpdate} encType="multipart/form-data">
          <div className="grid gap-4 py-4">
            {/* Name Field */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                value={name}
                placeholder={shop?.name}
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
                placeholder={shop?.description}
                onChange={(e) => setDescription(e.target.value)}
                id="description"
                className="col-span-3"
              />
            </div>

            {/* Logo Upload */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="logo" className="text-right">
                Logo
              </Label>
              <Input
                type="file"
                onChange={(e) =>
                  setLogo(e.target.files ? e.target.files[0] : null)
                }
                id="logo"
                className="col-span-3"
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
  );
};

export default UpdateShopModal;
