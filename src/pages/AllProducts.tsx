import React, { useState } from "react";
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

const AllProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("all"); // Default to 'all'

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
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;