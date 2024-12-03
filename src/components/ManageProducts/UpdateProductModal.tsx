/* eslint-disable @typescript-eslint/no-unused-vars */
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
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/redux/features/product/productApi";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import toast, { Toaster } from "react-hot-toast";

// Type for handling form
type FormData = {
  name: string;
  description: string;
  pricePerHour: string;
  isAvailable: boolean;
  image: string;
  cc: string;
  year: string;
  model: string;
  brand: string;
};

const UpdateProductModal = ({ bikeId }: { bikeId: string }) => {
  // Fetching the single bike by RTK query
  const { data: bikeData, isLoading: isBikeLoading } =
    useGetProductByIdQuery(bikeId);
  //   console.log('single bike',bikeData.data)

  // Update bike hook from RTK query
  const [updateBike] = useUpdateProductMutation();

  // Setting all data as an empty string and boolean for isAvailable
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    pricePerHour: "",
    isAvailable: false,
    image: "",
    cc: "",
    year: "",
    model: "",
    brand: "",
  });

  useEffect(() => {
    if (bikeData) {
      setFormData({
        name: bikeData?.data?.name || "",
        description: bikeData?.data?.description || "",
        pricePerHour: bikeData?.data?.pricePerHour
          ? bikeData?.data?.pricePerHour.toString()
          : "",
        isAvailable: bikeData?.data?.isAvailable ?? false,
        image: bikeData?.data?.image || "",
        cc: bikeData?.data?.cc ? bikeData?.data?.cc.toString() : "",
        year: bikeData?.data?.year ? bikeData?.data?.year.toString() : "",
        model: bikeData?.data?.model || "",
        brand: bikeData?.data?.brand || "",
      });
    }
  }, [bikeData]);

  // Function for changing data
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value, // Handle checkbox for boolean
    }));
  };

  // Function for submitting form
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const updatedBike = Object.keys(formData).reduce((acc, key) => {
      const value = formData[key as keyof FormData];
      // Convert necessary fields to numbers before sending
      if (value) {
        acc[key as keyof FormData] = ["pricePerHour", "cc", "year"].includes(
          key
        )
          ? Number(value)
          : (value as any);
      }
      return acc;
    }, {} as Partial<FormData>);

    // console.log('id=>', bikeId, 'data=>', updatedBike)
    updateBike({ id: bikeId, bikeInfo: updatedBike });
    toast.success("Bike Updated Successfully");
  };

  if (isBikeLoading) {
    return <div>Loading...</div>;
  }

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
            <DialogTitle>Update Bike</DialogTitle>
            <DialogDescription>Update the bike details</DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  placeholder={bikeData?.data?.name}
                  value={formData.name}
                  onChange={handleChange}
                  id="name"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  placeholder={bikeData?.data?.description || ""}
                  value={formData.description}
                  onChange={handleChange}
                  id="description"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="pricePerHour" className="text-right">
                  Price Per Hour
                </Label>
                <Input
                  placeholder={bikeData?.data?.pricePerHour?.toString() || ""}
                  value={formData.pricePerHour}
                  onChange={handleChange}
                  id="pricePerHour"
                  type="number"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="isAvailable" className="text-right">
                  Available
                </Label>
                <Input
                  type="checkbox"
                  checked={formData.isAvailable}
                  onChange={handleChange}
                  id="isAvailable"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Image Link
                </Label>
                <Input
                  placeholder={bikeData?.data?.image || ""}
                  value={formData.image}
                  onChange={handleChange}
                  id="image"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cc" className="text-right">
                  CC
                </Label>
                <Input
                  placeholder={bikeData?.data?.cc?.toString() || ""}
                  value={formData.cc}
                  onChange={handleChange}
                  id="cc"
                  type="number"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="year" className="text-right">
                  Year
                </Label>
                <Input
                  placeholder={bikeData?.data?.year?.toString() || ""}
                  value={formData.year}
                  onChange={handleChange}
                  id="year"
                  type="number"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="model" className="text-right">
                  Model
                </Label>
                <Input
                  placeholder={bikeData?.data?.model || ""}
                  value={formData.model}
                  onChange={handleChange}
                  id="model"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="brand" className="text-right">
                  Brand
                </Label>
                <Input
                  placeholder={bikeData?.data?.brand || ""}
                  value={formData.brand}
                  onChange={handleChange}
                  id="brand"
                  className="col-span-3"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <DialogClose asChild>
                <button
                  className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-500 transition-colors duration-300"
                  type="submit"
                >
                  Save
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
