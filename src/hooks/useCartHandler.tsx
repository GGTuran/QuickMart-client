import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import toast from "react-hot-toast";
import {
  addToCart,
  replaceCart,
  cancelCartUpdate,
} from "@/redux/features/cart/cartSlice";
import { TProduct } from "@/types/product.interface";
import { useState } from "react";
import ConflictModal from "@/components/Conflict/ConflictModal";

const useCartHandler = () => {
  const dispatch = useDispatch();
  const { currentShopId } = useSelector((state: RootState) => state.cart);

  const [showModal, setShowModal] = useState(false);
  const [conflictProduct, setConflictProduct] = useState<TProduct | null>(null);
  const [conflictShopId, setConflictShopId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const handleAddToCart = (product: TProduct, shopId: any, user: string) => {
    if (currentShopId && currentShopId !== shopId?._id) {
      toast.error("You can add product from only one shop");
      setShowModal(true); // Should trigger modal to show
      console.log("Opening modal");
      <ConflictModal
        shopId={shopId?._id}
        product={product}
        userId={user}
        currentShopId={currentShopId}
        setShowModal={setShowModal}
      />;
      return;
    }

    dispatch(addToCart({ product, shopId, userId: user }));
    toast.success("Product added to the cart!");
  };

  const handleResolveConflict = (replace: boolean) => {
    if (replace && conflictProduct && conflictShopId && userId) {
      dispatch(
        replaceCart({
          product: conflictProduct,
          shopId: conflictShopId,
          userId,
        })
      );
      toast.success("Cart replaced with the new product!");
    } else {
      toast.success("Current cart retained.");
    }

    // Reset conflict state and close modal
    setShowModal(false);
    setConflictProduct(null);
    setConflictShopId(null);
    setUserId(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setConflictProduct(null);
    setConflictShopId(null);
    setUserId(null);
  };

  return {
    handleAddToCart,
    handleResolveConflict,
    handleCloseModal,
    showModal,
    conflictProduct,
    conflictShopId,
    userId,
  };
};

export default useCartHandler;
