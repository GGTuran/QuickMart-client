import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  deleteCouponCode,
  setCouponCode,
} from "@/redux/features/coupon/couponSlice";
import { RootState, AppDispatch } from "@/redux/store";

const Coupon = () => {
  const [newCoupon, setNewCoupon] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const coupons = useSelector((state: RootState) => state.coupon.codes);

  const handleAddCoupon = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newCoupon.trim()) {
      toast.error("Please enter a valid coupon code.");
      return;
    }

    dispatch(setCouponCode(newCoupon.trim()));
    toast.success("Coupon added successfully!");
    setNewCoupon("");
  };

  const handleDeleteCoupon = (code: string) => {
    dispatch(deleteCouponCode(code));
    toast.success("Coupon deleted successfully!");
  };

  return (
    <div className="py-4 px-4 sm:px-6 lg:px-8">
      <Toaster />
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold tracking-tight  sm:text-4xl">
          Manage Coupons
        </h2>
      </div>

      {/* Add Coupon Dialog */}
      <div className="mt-8 flex justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Coupon</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add a New Coupon</DialogTitle>
              <DialogDescription>
                Enter the coupon code you want to add.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddCoupon}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="coupon" className="text-right">
                    Coupon Code
                  </Label>
                  <Input
                    value={newCoupon}
                    onChange={(e) => setNewCoupon(e.target.value)}
                    id="coupon"
                    placeholder="Enter coupon code"
                    className="col-span-3"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <DialogClose asChild>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                  >
                    Add Coupon
                  </button>
                </DialogClose>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Display Coupons */}
      <div className="mt-8 max-w-3xl mx-auto">
        <h3 className="text-xl font-bold ">Your Coupons</h3>
        <ul className="mt-4 space-y-2">
          {coupons.map((code) => (
            <li
              key={code}
              className="flex justify-between items-center p-4 border border-gray-300 rounded-lg dark:border-gray-600"
            >
              <span className="text-gray-900 dark:text-white">{code}</span>
              <button
                onClick={() => handleDeleteCoupon(code)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Coupon;
