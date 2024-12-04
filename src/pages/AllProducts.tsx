import React, { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard/ProductCard";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { useGetAllCategoryQuery } from "@/redux/features/category/categoryApi";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "react-router-dom";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const AllProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("all"); // Default to 'all'
  const [searchParams] = useSearchParams();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of products to display per page

  // Fetch category from query params on initial render
  useEffect(() => {
    const initialCategory = searchParams.get("category") || "all";
    setCategory(initialCategory);
  }, [searchParams]);

  // Fetch products
  const { data: productsData } = useGetAllProductsQuery({
    searchTerm,
    category: category === "all" ? "" : category,
  });

  // Fetch categories
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetAllCategoryQuery("");

  // Products data
  let products = productsData?.data || [];

  // Apply frontend sorting
  if (sortOrder === "lowToHigh") {
    products = [...products].sort((a, b) => a.price - b.price);
  } else if (sortOrder === "highToLow") {
    products = [...products].sort((a, b) => b.price - a.price);
  }

  // Handle product pagination
  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageProducts = products.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="m-10 space-y-6">
      {/* Controls Section */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Search */}
        <div className="w-full sm:w-auto">
          <Input
            type="text"
            placeholder="Search by keyword"
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-2"
          />
        </div>

        {/* Category Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="px-4 py-2 border rounded-md shadow-sm">
              Select Category
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup
              value={category}
              onValueChange={(value) => setCategory(value)}
            >
              <DropdownMenuRadioItem value="all">
                All Categories
              </DropdownMenuRadioItem>
              {!isCategoriesLoading &&
                categories?.data?.map((cat) => (
                  <DropdownMenuRadioItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </DropdownMenuRadioItem>
                ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Sort Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="px-4 py-2 border rounded-md shadow-sm">
              Sort by Price
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup
              value={sortOrder}
              onValueChange={(value) => setSortOrder(value)}
            >
              <DropdownMenuRadioItem value="all">
                All Products
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="lowToHigh">
                Low to High
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="highToLow">
                High to Low
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentPageProducts.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center space-x-2 mt-6">
        <Pagination>
          <PaginationPrevious
            onClick={() => handlePageChange(currentPage - 1)}
            // disabled={currentPage === 1}
          />
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={currentPage === index + 1}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationNext
            onClick={() => handlePageChange(currentPage + 1)}
            // disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
    </div>
  );
};

export default AllProducts;
