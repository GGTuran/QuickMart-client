import { useState } from "react";
import { useGetProductsByShopIdQuery } from "@/redux/features/product/productApi";
import { Toaster } from "react-hot-toast";
import { Button } from "../ui/button";
import useCartHandler from "@/hooks/useCartHandler";
import { useGetProfileQuery } from "@/redux/features/user/userApi";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination"; // Import custom pagination components

const ProductList = ({ shopId }: { shopId: any }) => {
  const { handleAddToCart } = useCartHandler();
  const { data: userData } = useGetProfileQuery("", { pollingInterval: 30000 });
  const user = userData?.data;
  const { data } = useGetProductsByShopIdQuery(shopId);
  const products = data?.data;

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Number of products to display per page

  // Handle pagination
  const totalItems = products?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageProducts = products?.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="mt-8">
      <Toaster />
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentPageProducts?.map((product: any) => (
          <div
            key={product._id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            <img
              src={product?.image}
              alt={product?.name}
              className="w-full h-32 sm:h-40 object-cover rounded"
            />
            <h3 className="text-sm sm:text-base font-semibold mt-2">
              {product?.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              ${product?.price?.toFixed(2)}
            </p>
            <Button
              onClick={() =>
                handleAddToCart(product, product.shopId, user?._id)
              }
              className="w-full mt-4 py-2 rounded"
            >
              Add to Cart
            </Button>
          </div>
        ))}
      </div>

      {/* Custom Pagination Controls */}
      <Pagination className="mt-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              // disabled={currentPage === 1}
            />
          </PaginationItem>

          {/* Display page numbers */}
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

          {/* Ellipsis if needed */}
          {totalPages > 5 && currentPage < totalPages - 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              // disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ProductList;
