import { useGetAllCategoryQuery } from "@/redux/features/category/categoryApi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CategoryCard = ({ category }: { category: any }) => {
  const cardVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      className="relative overflow-hidden bg-cover bg-center rounded-lg shadow-lg hover:shadow-xl transition-shadow"
      style={{ paddingBottom: "56.25%" }}
    >
      <Link to={`/all-products?category=${category._id}`}>
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-60 transition-opacity">
          <h5 className="text-white text-lg lg:text-xl font-bold px-4 py-2">
            {category.name}
          </h5>
        </div>
        <img
          src={
            category.image ||
            "https://via.placeholder.com/400x300?text=No+Image"
          }
          alt={`${category.name} Category`}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </Link>
    </motion.div>
  );
};

const Category = () => {
  const { data: categoryData, isLoading, isError } = useGetAllCategoryQuery("");
  const categories = categoryData?.data;

  if (isLoading) {
    return (
      <div className="text-center text-xl mt-20">Loading categories...</div>
    );
  }

  if (isError || !categories) {
    return (
      <div className="text-center text-xl mt-20 text-red-500">
        Failed to load categories.
      </div>
    );
  }

  return (
    <div className=" px-5 mb-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center text-3xl lg:text-4xl font-medium my-8 lg:my-12">
          Categories
        </h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {categories.map((category: any) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
