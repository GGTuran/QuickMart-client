import Loading from "@/components/Loading/Loading";

import { Link, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
} from "@/redux/features/product/productApi";

const ProductDetails = () => {
  const { productId } = useParams();
  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(productId);

  const { data: relatedProducts } = useGetAllProductsQuery({
    category: product?.data?.category._id,
    searchTerm: "",
  });

  const reviews = product?.data?.reviews;

  console.log(reviews, "review");
  console.log(relatedProducts, product?.data?.category._id, "related");

  console.log(product, "from gg");
  console.log(product?.data?.category.name);

  // const details = product?.data;
  // console.log(details, "detalis");

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [startTime, setStartTime] = useState("");

  const handleBookNow = () => {
    setIsDialogOpen(true);
  };

  // const handleConfirm = async () => {
  //   try {
  //     const rentalData = {
  //       productId: productId,
  //       startTime: new Date(startTime),
  //     };
  //     const res = await createRental(rentalData).unwrap();
  //     // console.log(res);
  //     //res.data.paymentSession.payment_url
  //     toast.success("Booking successful! Redirecting to payment page...");
  //     // Redirect to payment page
  //     window.location.href = res?.data?.paymentSession.payment_url;
  //     // navigate('/');
  //   } catch (error) {
  //     toast.error("Error booking product. Please try again.");
  //   } finally {
  //     setIsDialogOpen(false);
  //   }
  // };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  if (isLoading) {
    return (
      <div className="m-10 flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center mt-8 text-red-500">
        Error fetching product.
      </div>
    );
  }

  if (!product) {
    return <div className="text-center mt-8">Product not found.</div>;
  }

  return (
    <div className="m-10  mx-auto px-4 mt-8">
      <Toaster />
      <div className="max-w-lg mx-auto  p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">{product.data.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:mt-12">
            <img
              src={product.data.image}
              alt={product.data.name}
              className="rounded-lg"
            />
          </div>
          <div>
            <p className=" mb-2">Brand: {product?.data?.category?.name}</p>
            {/* <p className=" mb-2">Description: {product.data.description}</p> */}
            {/* Shop Link */}
            <p className="text-lg mb-4">
              <span className="font-semibold">Shop:</span>{" "}
              <Link
                to={`/shops/${product?.data?.shopId._id}`}
                className="text-blue-500 hover:underline"
              >
                {product?.data?.shopId?.name}
              </Link>
            </p>
            {/* <p className=" mb-2">
              Available: {product.data.isAvailable ? "Yes" : "No"}
            </p> */}
            {/* <span className="flex gap-2">{Rating(product.data.rating)}</span> */}

            <p className=" mb-2">Price: ${product.data.price}</p>

            <Button
              onClick={handleBookNow}
              className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-500 transition-colors duration-300"
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>

      {/* customer reviews */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6">Customer Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((review: any, index: any) => (
            <div
              key={index}
              className="border-t border-gray-200 py-4 flex justify-center items-center gap-5"
            >
              <p className="font-semibold">{review.userId.name}</p>
              <p className="text-sm">{review.comment}</p>
              <p className="text-sm text-yellow-500">Rating: {review.rating}</p>
            </div>
          ))
        )}
      </div>

      {/* relatedProducts */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6">Related Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProducts?.data?.map((product) => (
            <div
              key={product._id}
              className="p-4 border rounded-lg hover:shadow-md transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="rounded-lg mb-4"
              />
              <h4 className="text-lg font-semibold mb-2">{product.name}</h4>
              <p className="text-sm text-gray-600">{product.category.name}</p>
              <Link
                to={`/products/${product._id}`}
                className="text-blue-500 hover:underline mt-2 block"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Dialog for booking */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="hidden">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book Bike</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Bike ID
              </label>
              <Input type="text" value={productId} readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Time
              </label>
              <Input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="mt-4 flex justify-end space-x-2">
            <Button variant="ghost" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
            //  onClick={handleConfirm}
            >
              Pay Advance to Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDetails;
