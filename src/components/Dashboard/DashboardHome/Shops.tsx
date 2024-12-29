import ShopCard from "@/components/ProductCard/ShopCard";
import { useGetAllShopsQuery } from "@/redux/features/shop/shopApi";

const TopShops = () => {
  const { data: shops } = useGetAllShopsQuery("");
  const topShops = shops?.data;
  // console.log(topShops, "top shops");

  return (
    <div className="m-10 space-y-6">
      <h1 className="text-xl text-center font-bold">Top Shops</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6">
        {topShops?.slice(0, 3)?.map((shop: any) => (
          <ShopCard shop={shop} key={shop._id} />
        ))}
      </div>
    </div>
  );
};

export default TopShops;
