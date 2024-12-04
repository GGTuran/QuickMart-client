import Loading from "@/components/Loading/Loading";

import { Link, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
} from "@/redux/features/product/productApi";
import useCartHandler from "@/hooks/useCartHandler";
import { useGetProfileQuery } from "@/redux/features/user/userApi";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { addToRecentlyViewed } from "@/redux/features/recent/recentViewed";
import { TProduct } from "@/types/product.interface";
import { useDispatch } from "react-redux";

const ProductDetails = () => {
  const { productId } = useParams();

  const dispatch = useDispatch();
  const { handleAddToCart } = useCartHandler();

  const { data: userData } = useGetProfileQuery("", {
    pollingInterval: 30000,
  });

  const user = userData?.data;

  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(productId);

  const { data: relatedProducts } = useGetAllProductsQuery({
    category: product?.data?.category?._id,
    searchTerm: "",
  });

  const reviews = product?.data?.reviews;
  const shopId = product?.data?.shopId;

  useEffect(() => {
    if (product?.data) {
      const normalizedProduct: TProduct = {
        _id: product.data._id,
        name: product.data.name,
        image: product.data.image,
        price: product.data.price || 0,
        discount: product.data.discount || 0,
        category: product.data.category,
        inventoryCount: product.data.inventoryCount || 0,
        shopId: product.data.shopId,
        reviews: product.data.reviews || [],
      };

      // Dispatch action to add to the recently viewed products list
      dispatch(addToRecentlyViewed(normalizedProduct));
    }
  }, [product?.data, dispatch]);

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
        <h2 className="text-2xl font-bold mb-4">{product?.data?.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:mt-12">
            <img
              src={product?.data?.image}
              alt={product?.data?.name}
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
                to={`/shops/${product?.data?.shopId?._id}`}
                className="text-blue-500 hover:underline"
              >
                {product?.data?.shopId?.name}
              </Link>
            </p>
            {/* <p className=" mb-2">
              Available: {product.data.isAvailable ? "Yes" : "No"}
            </p> */}
            {/* <span className="flex gap-2">{Rating(product.data.rating)}</span> */}

            <p className=" mb-2">Price: ${product?.data?.price}</p>

            <Button
              onClick={() =>
                // console.log(product,product.shopId, user?._id, 'before dispatch')
                handleAddToCart(product, product?.data?.shopId, user?._id)
              }
              className="w-full mt-4 py-2 rounded"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      {/* customer reviews */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6">Customer Reviews</h3>
        {reviews?.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews?.map((review: any, index: any) => (
            <div
              key={index}
              className="border-t border-gray-200 py-4 flex justify-center items-center gap-5"
            >
              <p className="font-semibold">{review?.userId?.name}</p>
              <p className="text-sm">{review?.comment}</p>
              <p className="text-sm text-yellow-500">
                Rating: {review?.rating}
              </p>
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
              key={product?._id}
              className="p-4 border rounded-lg hover:shadow-md transition"
            >
              <img
                src={product?.image}
                alt={product?.name}
                className="rounded-lg mb-4"
              />
              <h4 className="text-lg font-semibold mb-2">{product?.name}</h4>
              <p className="text-sm text-gray-600">{product?.category?.name}</p>
              <Link
                to={`/products/${product?._id}`}
                className="text-blue-500 hover:underline mt-2 block"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
