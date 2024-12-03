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
import { useAddShopMutation } from "@/redux/features/shop/shopApi";
import { useGetProfileQuery } from "@/redux/features/user/userApi";
import { toast } from "react-hot-toast";
import { useState, FormEvent } from "react";

const AddShopModal = () => {
  // Fetch vendor data (optional, for vendorId association)
  const { data: profileData } = useGetProfileQuery("", {
    pollingInterval: 30000,
  });
  const vendorId = profileData?.data?._id;

  // Component state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState<File | null>(null);

  // RTK Query mutation
  const [addShop, { isLoading }] = useAddShopMutation();

  // Form submission handler
  const handleAddShop = async (e: FormEvent) => {
    e.preventDefault();

    // Create new shop data
    const newShopData = {
      name,
      description,
      vendorId, // Include vendorId if required by backend
    };

    try {
      // Create FormData object for handling file upload
      const formData = new FormData();
      formData.append("data", JSON.stringify(newShopData));
      if (logo) formData.append("image", logo);

      // Execute the mutation
      await addShop(formData).unwrap();

      // Success feedback
      toast.success("Shop added successfully!");
    } catch (error) {
      // Error feedback
      toast.error("Error adding shop. Please try again.");
      console.error("Error adding shop:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Shop</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Shop</DialogTitle>
          <DialogDescription>
            Provide details for your new shop below
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleAddShop} encType="multipart/form-data">
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
                placeholder="Enter shop name"
                className="col-span-3"
                required
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
                placeholder="Enter shop description"
                className="col-span-3"
                required
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

export default AddShopModal;
