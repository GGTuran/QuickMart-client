import { useGetAllProductsQuery } from "@/redux/features/product/productApi"; // Fetching products
import CompareCard from "./CompareCard";
import CompareTable from "./CompareTable";
import { TProduct } from "@/types/product.interface";
import Loading from "../Loading/Loading";

const CompareList = () => {
  const { data: products, isLoading } = useGetAllProductsQuery("");

  if (isLoading) return <Loading />;

  return (
    <div className="p-4">
      <CompareTable />
      <h1 className="text-3xl font-bold mb-6 text-center">Compare Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products?.data?.map((product: TProduct) => (
          <CompareCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CompareList;
