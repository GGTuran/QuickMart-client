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
import { useUpdateProfileMutation } from "@/redux/features/user/userApi";
import { Toaster, toast } from "react-hot-toast";
import { useState, FormEvent } from "react";

const UpdateProfileModal = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();

    const updatedProfileData: Record<string, string | undefined> = {};
    if (name) updatedProfileData.name = name;
    if (email) updatedProfileData.email = email;
    if (phone) updatedProfileData.phone = phone;
    if (address) updatedProfileData.address = address;

    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(updatedProfileData));
      if (image) formData.append("image", image);

      await updateProfile(formData).unwrap();

      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Error updating profile. Please try again.");
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Update Profile</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
          <DialogDescription>
            Modify your profile details below
          </DialogDescription>
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
                onChange={(e) => setName(e.target.value)}
                id="name"
                placeholder="Enter your name"
                className="col-span-3"
              />
            </div>

            {/* Email Field */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                placeholder="Enter your email"
                type="email"
                className="col-span-3"
              />
            </div>

            {/* Phone Field */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                id="phone"
                placeholder="Enter your phone number"
                type="tel"
                className="col-span-3"
              />
            </div>

            {/* Address Field */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                id="address"
                placeholder="Enter your address"
                className="col-span-3"
              />
            </div>

            {/* Image Upload */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Profile Picture
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

export default UpdateProfileModal;
