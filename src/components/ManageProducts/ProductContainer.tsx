import { useState } from "react";

import Loading from "../Loading/Loading";
import ManageCard from "./ManageCard";

import AddBikeModal from "./AddProductModal";
import { Label } from "@/components/ui/label";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { Toaster } from "react-hot-toast";

const ProductContainer = () => {
  // Fetching data through RTK Query
  const { data: products, isLoading } = useGetAllProductsQuery(undefined, {
    pollingInterval: 10000,
  }); //using rtk polling interval for latest product

  // Define filter state
  const [filters, setFilters] = useState({
    brand: "",
    model: "",
    availability: "",
  });

  // Get unique brands and models from bike data
  const brands = Array.from(
    new Set(products?.data?.map((bike: any) => bike.brand))
  );
  const models = Array.from(
    new Set(products?.data?.map((bike: any) => bike.model))
  );

  // Filter bikes based on filter state
  const filteredBikes = products?.data?.filter((bike: any) => {
    const matchesBrand = filters?.brand ? bike.brand === filters.brand : true;
    const matchesModel = filters?.model ? bike.model === filters.model : true;
    const matchesAvailability = filters.availability
      ? bike.isAvailable!.toString() === filters.availability
      : true;

    return matchesBrand && matchesModel && matchesAvailability;
  });

  if (isLoading) {
    return (
      <div className="text-2xl text-black flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="m-10">
      <Toaster />
      {/* Filter Options */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-5 space-y-4 md:space-y-0">
        <div>
          <Label htmlFor="brand" className="block text-sm font-medium">
            Brand
          </Label>
          <select
            id="brand"
            className="border p-2 rounded dark:bg-black w-full md:w-auto"
            value={filters.brand}
            onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
          >
            <option value="">Brands</option>
            {brands.map((brand) => (
              <option key={String(brand)} value={String(brand)}>
                {brand as string}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="model" className="block text-sm font-medium">
            Model
          </Label>
          <select
            id="model"
            className="border p-2 dark:bg-black rounded w-full md:w-auto"
            value={filters.model}
            onChange={(e) => setFilters({ ...filters, model: e.target.value })}
          >
            <option value="">Models</option>
            {models.map((model) => (
              <option key={String(model)} value={String(model)}>
                {model as string}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="availability" className="block text-sm font-medium">
            Availability
          </Label>
          <select
            id="availability"
            className="border p-2 dark:bg-black rounded w-full md:w-auto"
            value={filters.availability}
            onChange={(e) =>
              setFilters({ ...filters, availability: e.target.value })
            }
          >
            <option value="">All</option>
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
        </div>

        {/* Clear Filter Button */}
        <button
          className="bg-red-500 text-white px-4 py-2 rounded mt-2 md:mt-0"
          onClick={() => setFilters({ brand: "", model: "", availability: "" })}
        >
          Clear Filters
        </button>
      </div>

      {/* Add Product Button */}
      <div className="flex justify-between mb-5">
        <AddBikeModal />
      </div>

      {/* Manage Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredBikes?.map((product: JSX.IntrinsicAttributes & any) => (
          <ManageCard key={product._id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductContainer;
