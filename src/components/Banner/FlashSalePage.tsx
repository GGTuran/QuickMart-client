import { useGetFlashProductsQuery } from "@/redux/features/product/productApi";
import ProductCard from "@/components/ProductCard/ProductCard";
import Loading from "../Loading/Loading";

const FlashSalePage = () => {
  const { data: products, isLoading } = useGetFlashProductsQuery("");

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-center mb-8 ">
        Flash Sale Deals 🛒
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.data.map((product: any) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FlashSalePage;
