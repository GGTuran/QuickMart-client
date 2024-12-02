import { useGetProductsByShopIdQuery } from "@/redux/features/product/productApi";
import { Toaster } from "react-hot-toast";
import { Button } from "../ui/button";
import useCartHandler from "@/hooks/useCartHandler";
import { useGetProfileQuery } from "@/redux/features/user/userApi";

const ProductList = ({ shopId }: { shopId: any }) => {
  const { handleAddToCart } = useCartHandler();

  const { data: userData } = useGetProfileQuery("", {
    pollingInterval: 30000,
  });

  const user = userData?.data;
  console.log(user, "user");

  const { data } = useGetProductsByShopIdQuery(shopId);
  const products = data?.data;

  return (
    <div className="mt-8">
      <Toaster />
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products?.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-32 sm:h-40 object-cover rounded"
            />
            <h3 className="text-sm sm:text-base font-semibold mt-2">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              ${product.price.toFixed(2)}
            </p>
            <Button
              onClick={() =>
                // console.log(product,product.shopId, user?._id, 'before dispatch')
                handleAddToCart(product, product.shopId, user?._id)
              }
              className="w-full mt-4 py-2 rounded"
            >
              Add to Cart
            </Button>
            {/* <button onClick={resetCartXD}>Reset</button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
