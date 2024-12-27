import ShopCard from "@/components/ProductCard/ShopCard";
import { useGetAllShopsQuery } from "@/redux/features/shop/shopApi";

const AllShops = () => {
  const { data: AllShops } = useGetAllShopsQuery("");
  const shops = AllShops?.data;
  console.log(shops, "shops");
  return (
    <div className="m-10 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {shops?.map((shop: any) => (
          <ShopCard shop={shop} key={shop._id} />
        ))}
      </div>
    </div>
  );
};

export default AllShops;
