import toast, { Toaster } from "react-hot-toast";
import { useDeleteProductMutation } from "@/redux/features/product/productApi";
import UpdateProductModal from "./UpdateProductModal";
import { useGetReviewByProductIdQuery } from "@/redux/features/review/reviewApi";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const ManageCard = ({
  _id,
  description,
  image,
  name,
  price,
  inventoryCount,
  category,
}: any) => {
  const [deleteProduct] = useDeleteProductMutation();
  const { data: reviewData } = useGetReviewByProductIdQuery(_id);
  const [showReviews, setShowReviews] = useState(false); // State to handle reviews modal visibility
  const reviews = reviewData?.data;

  const removeProduct = () => {
    deleteProduct(_id);
    toast.success("Product deleted successfully");
  };

  return (
    <main>
      <Toaster />
      <div className="rounded-2xl group relative block overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <button className="absolute top-4 right-4 z-10 rounded-full bg-white p-1.5 text-black transition hover:text-gray-900/75">
          <span className="sr-only">Wishlist</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>

        <img
          src={image}
          alt="Product Image"
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
        />

        <div className="relative border border-gray-100 p-6">
          <h3 className="mt-4 text-lg font-medium text-black dark:text-white">
            {category.name}
          </h3>

          <h3 className="mt-4 text-xl font-semibold text-black dark:text-white">
            {name}
          </h3>

          <div className="mt-4 flex justify-between items-center">
            <div>
              <p className="text-black font-medium dark:text-white">${price}</p>
              <p className="text-black mb-2 dark:text-white">
                Available: {inventoryCount}
              </p>
              <Dialog>
                <DialogTrigger>
                  <p className="font-semibold text-blue-600 cursor-pointer hover:text-blue-800">
                    Reviews
                  </p>
                </DialogTrigger>

                {/* Dialog for displaying reviews */}
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Product Reviews</DialogTitle>
                    <DialogDescription>
                      Here are the reviews for this product:
                    </DialogDescription>
                  </DialogHeader>

                  {/* Loop over reviews and display them */}
                  <div className="space-y-4">
                    {reviews && reviews.length > 0 ? (
                      reviews.map((review: any) => (
                        <div key={review?._id} className="border-b pb-4">
                          <p className="font-semibold">
                            {review?.userId?.name}
                          </p>
                          <p>Rating: {review?.rating} / 5</p>
                          <p className="italic">{review?.comment}</p>
                          <p className="text-sm text-gray-500">
                            Posted on{" "}
                            {new Date(review?.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No reviews yet.</p>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="mt-4 flex justify-between items-center">
            {/* Reviews Button */}

            {/* Update Product Modal */}
            <UpdateProductModal id={_id}></UpdateProductModal>

            <button
              onClick={removeProduct}
              className="px-4 py-2 bg-red-300 text-black rounded-lg hover:bg-red-500 transition-colors duration-300"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ManageCard;
