import { useParams } from "react-router-dom";
import {
  useFollowShopMutation,
  useGetShopByIdQuery,
  useUnfollowShopMutation,
} from "@/redux/features/shop/shopApi";
// import { useGetProductsByShopIdQuery } from "@/redux/features/product/productApi";
import { Button } from "@/components/ui/button";
import { useGetProfileQuery } from "@/redux/features/user/userApi";
import ProductList from "@/components/Shop/ProductList";

const Shop = () => {
  const { shopId } = useParams();
  // console.log(shopId);

  // Fetch shop details
  const { data: shopData, isLoading: shopLoading } =
    useGetShopByIdQuery(shopId);
  // console.log(shopData, "data");

  // Fetch products by vendor
  // const { data } = useGetProductsByShopIdQuery(shopId);
  // const products = data?.data;
  // console.log(products, "from shop");

  const { data: userData } = useGetProfileQuery("", {
    pollingInterval: 30000,
  });

  const user = userData?.data;
  console.log(user, "user");

  const [followShop, { isLoading: followLoading }] = useFollowShopMutation();
  const [unfollowShop, { isLoading: unfollowLoading }] =
    useUnfollowShopMutation();

  console.log(user, "following?");

  const isFollowing = user?.followingShops?.includes(shopId);
  //   console.log(first)

  const handleFollowToggle = async () => {
    if (isFollowing) {
      await unfollowShop(shopId);
    } else {
      await followShop(shopId);
    }
  };

  if (shopLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  const { name, logo, description, followers } = shopData?.data || {};
  //   const products = productsData?.data || [];

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto">
      {/* Shop Header */}
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
          <div className="flex items-center mt-4 gap-4">
            <span className="text-sm sm:text-base font-semibold">
              Followers: {followers}
            </span>
            <Button
              className={`${
                isFollowing
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white px-4 py-2 rounded`}
              onClick={handleFollowToggle}
              disabled={followLoading || unfollowLoading}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </Button>
          </div>
        </div>
      </div>

      {/* Product List */}
      <ProductList shopId={shopId} key={shopId} />
    </div>
  );
};

export default Shop;
