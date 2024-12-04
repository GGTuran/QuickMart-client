import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useCartHandler from "@/hooks/useCartHandler";
import { useGetProfileQuery } from "@/redux/features/user/userApi";

const ProductCard = ({ product }: any) => {
  const { handleAddToCart } = useCartHandler();

  const { data: userData } = useGetProfileQuery("", { pollingInterval: 30000 });
  const user = userData?.data;

  return (
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-card rounded-lg overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl"
    >
      <img
        src={product?.image}
        alt={product?.name}
        className="w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product?.name}</h3>
        <p className="text-sm mb-2">
          <span className="font-semibold"></span>
          {product?.category?.name || "Uncategorized"}
        </p>
        <p className="text-sm mb-2">Available: {product?.inventoryCount}</p>
        <span className="font-medium mb-1">${product?.price}</span>

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Link
              className="flex justify-center items-center"
              to={`/products/${product?._id}`}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-500 transition-colors duration-300"
              >
                View More
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                handleAddToCart(product, product.shopId, user?._id)
              }
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Add to Cart
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
