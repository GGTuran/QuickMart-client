import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TShop } from "@/types/shop.interface";

const ShopCard = ({ shop }: { shop: TShop & { createdAt: string } }) => {
  return (
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white rounded-lg overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl"
    >
      {/* Shop Logo */}
      <div className="h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 bg-gray-100 flex items-center justify-center">
        {shop?.logo ? (
          <img
            src={shop?.logo}
            alt={shop?.name}
            className="h-full w-auto object-contain"
          />
        ) : (
          <div className="text-gray-500 text-lg font-semibold">No Logo</div>
        )}
      </div>

      {/* Shop Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-center">{shop?.name}</h3>
        <p className="text-sm text-gray-600 text-center mb-2">
          Joined on: {new Date(shop?.createdAt).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-600 text-center mb-4">
          Followers: {shop?.followers}
        </p>

        {/* View More Button */}
        <div className="flex justify-center">
          <Link to={`/shops/${shop?._id}`}>
            {" "}
            {/* Update to the correct route */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-500 transition-colors duration-300"
            >
              View Shop
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ShopCard;
