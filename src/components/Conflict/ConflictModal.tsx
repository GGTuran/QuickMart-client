import {
  cancelCartUpdate,
  replaceCart,
  resolveConflict,
} from "@/redux/features/cart/cartSlice";
import { useDispatch } from "react-redux";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

const ConflictModal = ({
  product,
  shopId,
  userId,
  onClose,
  onResolve,
  showModal,
}: any) => {
  const dispatch = useDispatch();

  const handleReplace = () => {
    onResolve(true);
    dispatch(resolveConflict({ replace: true }));
    dispatch(replaceCart({ product, shopId, userId }));
    onClose();
  };

  const handleRetain = () => {
    onResolve(false);
    dispatch(cancelCartUpdate());
    onClose();
  };

  return (
    <AlertDialog open={showModal} onOpenChange={onClose}>
      {" "}
      {/* Open/Close based on showModal */}
      <AlertDialogTrigger asChild>
        <button className="hidden"></button> {/* Optional: Hide this trigger */}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Cart Conflict</AlertDialogTitle>
        <AlertDialogDescription>
          You can only add products from one shop at a time!
        </AlertDialogDescription>
        <AlertDialogFooter>
          <button
            onClick={handleReplace}
            className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Replace with new product(s)
          </button>
          <button
            onClick={handleRetain}
            className="w-full p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Retain current cart
          </button>
          <button
            onClick={onClose}
            className="w-full p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Cancel
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConflictModal;
