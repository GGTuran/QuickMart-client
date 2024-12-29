import Loading from "../Loading/Loading";
import { useGetProductsByShopIdQuery } from "@/redux/features/product/productApi";
import { Toaster } from "react-hot-toast";
import AddProductModal from "./AddProductModal";
import { useGetProfileQuery } from "@/redux/features/user/userApi";
import { useGetShopByVendorIdQuery } from "@/redux/features/shop/shopApi";
import ManageCard from "./ManageCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { useState } from "react";

const ProductContainer = () => {
  const { data } = useGetProfileQuery("", {
    pollingInterval: 30000,
  });

  const person = data?.data;
  const { data: shopByVendor } = useGetShopByVendorIdQuery(person?._id);
  const shop = shopByVendor?.data;

  // Fetching data through RTK Query
  const { data: productsData, isLoading } = useGetProductsByShopIdQuery(
    shop?._id,
    {
      pollingInterval: 40000,
    }
  );

  const products = productsData?.data;

  const { name, logo, description } = shop || {};

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Number of products to display per page

  // Calculate pagination values
  const totalItems = products?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPageProducts = products?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="m-10">
      <Toaster />

      {/* shop */}
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 border-b pb-4">
        <img
          src={logo}
          alt={`${name} logo`}
          className="w-20 h-20 sm:w-32 sm:h-32 object-cover rounded-full border"
        />
        <div className="flex-1">
          <h1 className="text-2xl sm:text-4xl font-bold">{name}</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            {description}
          </p>
        </div>
      </div>

      {/* Add Product Button */}
      <div className="flex justify-between mb-5">
        <AddProductModal />
      </div>

      {/* Manage Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {currentPageProducts?.map((product: JSX.IntrinsicAttributes & any) => (
          <ManageCard key={product._id} {...product} />
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

            {/* Ellipsis if needed */}
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

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
  );
};

export default ProductContainer;
