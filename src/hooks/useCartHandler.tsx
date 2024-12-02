import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import toast from "react-hot-toast";
import {
  addToCart,
  replaceCart,
  cancelCartUpdate,
} from "@/redux/features/cart/cartSlice";
import { TProduct } from "@/types/product.interface";

const useCartHandler = () => {
  const dispatch = useDispatch();
  const { currentShopId, cartConflict } = useSelector(
    (state: RootState) => state.cart
  );

  const handleAddToCart = (product: TProduct, shopId: any, userId: string) => {
    console.log("Current Shop ID:", currentShopId);
    console.log("Product Shop ID:", shopId);
    if (currentShopId && currentShopId !== shopId?._id) {
      // Conflict detected, notify user
      toast.error("You can only add products from one shop at a time!");
      dispatch(cancelCartUpdate());
      return;
    }

    // Add item to cart
    dispatch(
      addToCart({
        product,
        shopId,
        userId,
      })
    );
    toast.success(`${product.name} added to the cart!`);
  };

  const handleReplaceCart = (
    product: TProduct,
    shopId: string,
    userId: string
  ) => {
    // Replace the cart with the new item
    dispatch(
      replaceCart({
        product,
        shopId,
        userId,
      })
    );
    toast.success("Cart replaced with the new product!");
  };

  const handleCancelConflict = () => {
    // Cancel the cart update
    dispatch(cancelCartUpdate());
    toast.success("Cart update canceled.");
  };

  return {
    handleAddToCart,
    handleReplaceCart,
    handleCancelConflict,
  };
};

export default useCartHandler;
