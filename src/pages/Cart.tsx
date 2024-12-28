import {
  removeFromCart,
  resetCart,
  updateQuantity,
} from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { useGetProfileQuery } from "@/redux/features/user/userApi";
import { useCreateOrderMutation } from "@/redux/features/order/orderApi";

const Cart = () => {
  const { data: userData } = useGetProfileQuery("", {
    pollingInterval: 30000,
  });

  const user = userData?.data;

  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.items);
  const [createOrder] = useCreateOrderMutation();

  const [isCouponApplied, setIsCouponApplied] = useState(false); // Track if coupon is applied

  // Function for removing product from cart
  const handleRemove = (productId: string) => {
    dispatch(removeFromCart(productId));
    toast.success("Item removed from cart");
  };

  // Function for updating product quantity
  const handleQuantityChange = (productId: string, quantity: number) => {
    dispatch(updateQuantity({ productId, quantity }));
    toast.success("Cart updated");
  };

  // Calculating total price with 15% VAT
  const calculateTotal = () => {
    const total = cart.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
    const totalWithVAT = total * 1.15;
    return isCouponApplied ? totalWithVAT * 0.8 : totalWithVAT; // Apply 20% discount if coupon is applied
  };

  // Apply coupon
  const handleApplyCoupon = () => {
    if (isCouponApplied) {
      toast.error("Coupon has already been applied!");
    } else {
      setIsCouponApplied(true);
      toast.success("Coupon applied! 20% discount activated.");
    }
  };

  // Navigate to checkout page
  const handleCheckout = async () => {
    if (cart.every((item) => item.product.inventoryCount >= item.quantity)) {
      try {
        const orderPayload = {
          userId: user?._id,
          products: cart.map((item) => item.productId),
          shopId: cart[0].shopId,
          paymentStatus: "pending",
          orderDate: new Date().toISOString(),
        };
        const response = await createOrder(orderPayload).unwrap();
        toast.success("Order created successfully!");
        window.location.href = response?.data?.paymentSession.payment_url;
        dispatch(resetCart());
      } catch (error) {
        toast.error("Failed to create order. Please try again.");
      }
    } else {
      toast.error("Some items are out of stock");
    }
  };

  return (
    <div className="min-h-screen  flex flex-col items-center py-10">
      <Toaster />
      {/* <h1 className="text-3xl font-medium mb-8">Cart</h1> */}
      <div className="w-full max-w-4xl  rounded-lg shadow-lg p-6 space-y-6">
        {/* User Information */}
        {user && (
          <div className="flex flex-col items-center  rounded-lg p-4 ">
            <div className="flex justify-end items-center gap-5">
              <div>
                <img
                  src={user.image || "/default-user.jpg"}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover mb-4"
                />
              </div>
              <div>
                <h2 className="text-lg font-medium ">{user.name}</h2>
                <p className=" text-sm">{user.email}</p>
                <p className=" text-sm">{user.phone}</p>
                <p className=" text-sm">{user.address}</p>
              </div>
            </div>
          </div>
        )}

        {/* Cart Items */}
        {cart.length > 0 ? (
          <ul className="space-y-6">
            {cart.map((item) => (
              <motion.li
                key={item.productId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-between items-center p-4 rounded-lg shadow"
              >
                <div>
                  <h2 className="text-lg font-semibold">{item.product.name}</h2>
                  <p>Price: ${item.product.price}</p>
                  <div className="flex items-center rounded border border-gray-200 mt-2">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.productId, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                      className="px-3 py-1 text-gray-600 hover:opacity-75"
                    >
                      &minus;
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      readOnly
                      className="w-12 text-center border-transparent bg-transparent"
                    />
                    <button
                      onClick={() =>
                        handleQuantityChange(item.productId, item.quantity + 1)
                      }
                      disabled={item.quantity >= item.product.inventoryCount}
                      className="px-3 py-1 text-gray-600 hover:opacity-75"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemove(item.productId)}
                    className="mt-2 px-4 py-2 bg-red-300 text-black rounded-lg hover:bg-red-500"
                  >
                    Remove
                  </button>
                </div>
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              </motion.li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}

        {/* Total Price and Actions */}
        {cart.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-medium">
              Total: ${calculateTotal().toFixed(2)}
            </h2>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleApplyCoupon}
                disabled={isCouponApplied}
                className={`px-4 py-2 ${
                  isCouponApplied
                    ? "bg-gray-300 text-gray-500"
                    : "bg-green-300 hover:bg-green-500"
                } rounded-lg`}
              >
                {isCouponApplied ? "Coupon Applied" : "Apply Coupon"}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCheckout}
                disabled={cart.some(
                  (item) => item.product.inventoryCount < item.quantity
                )}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-500 rounded-lg"
              >
                Proceed to Checkout
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
