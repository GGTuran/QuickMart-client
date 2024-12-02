import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import toast from "react-hot-toast";
import {
  addToCart,
  replaceCart,
  cancelCartUpdate,
  resolveConflict,
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
    toast.success(`Product added to the cart!`);
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

  const handleResolveConflict = (replace: boolean) => {
    // Resolve the conflict: Replace the cart or keep the current cart
    dispatch(resolveConflict({ replace }));
    if (replace) {
      toast.success("Cart replaced with the new items!");
    } else {
      toast.success("Cart update canceled.");
    }
  };

  const handleCancelConflict = () => {
    // Cancel the cart update
    dispatch(cancelCartUpdate());
    toast.success("Cart update canceled.");
  };

  return {
    handleAddToCart,
    handleReplaceCart,
    handleResolveConflict,
    handleCancelConflict,
  };
};

export default useCartHandler;
