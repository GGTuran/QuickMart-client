import Loading from "@/components/Loading/Loading";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Link, useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
} from "@/redux/features/product/productApi";
import useCartHandler from "@/hooks/useCartHandler";
import { useGetProfileQuery } from "@/redux/features/user/userApi";
import { useEffect, useState } from "react";
import { addToRecentlyViewed } from "@/redux/features/recent/recentViewed";
import { TProduct } from "@/types/product.interface";
import { useDispatch } from "react-redux";
import CustomerReviews from "@/components/ProductCard/CustomerReviews";
import AddReviewModal from "@/components/Review/AddReviewModal";

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { handleAddToCart } = useCartHandler();

  const { data: userData } = useGetProfileQuery("", { pollingInterval: 30000 });
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

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Handle related products pagination
  const totalItems = relatedProducts?.data?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageProducts =
    relatedProducts?.data?.slice(startIndex, endIndex) || [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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

      dispatch(addToRecentlyViewed(normalizedProduct));
    }
  }, [product?.data, dispatch]);

  // Loading and error states
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
    <div className="m-10 mx-auto px-4 mt-8">
      <Toaster />
      <div className="max-w-lg mx-auto p-8 rounded-lg ">
        <h2 className="text-2xl font-bold mb-4">{product?.data?.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="">
            <img
              src={product?.data?.image}
              alt={product?.data?.name}
              className="rounded-lg"
            />
          </div>
          <div>
            <p className="mb-2">Brand: {product?.data?.category?.name}</p>
            <p className="text-lg mb-4">
              <span className="font-semibold">Shop:</span>{" "}
              <Link
                to={`/shops/${product?.data?.shopId?._id}`}
                className="text-blue-500 hover:underline"
              >
                {product?.data?.shopId?.name}
              </Link>
            </p>
            <p className="mb-2">Price: ${product?.data?.price}</p>

            <div className="flex justify-between gap-2">
              <Button
                onClick={() =>
                  handleAddToCart(
                    product?.data,
                    product?.data?.shopId,
                    user?._id
                  )
                }
                className=" mt-4 py-2 rounded"
              >
                Add to Cart
              </Button>
              <AddReviewModal productId={product?.data?._id} />
            </div>
          </div>
        </div>
      </div>

      {/* Customer reviews */}
      <CustomerReviews reviews={reviews} />

      {/* Related Products with Pagination */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6">Related Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentPageProducts.map((product: any) => (
            <div
              key={product?._id}
              className="p-4 border rounded-lg hover:shadow-md transition"
            >
              <img
                src={product?.image}
                alt={product?.name}
                className="rounded-lg mb-4 object-cover h-40 w-full"
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
        {/* Pagination Controls */}
        <div className="flex justify-center mt-6">
          <Pagination>
            <PaginationContent>
              {/* Previous Button */}
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  // disabled={currentPage === 1}
                />
              </PaginationItem>

              {/* Page Numbers */}
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={() => handlePageChange(index + 1)}
                    isActive={currentPage === index + 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {/* Next Button */}
              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  // disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
