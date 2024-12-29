import { useGetFlashProductsQuery } from "@/redux/features/product/productApi";
import { Link } from "react-router-dom";

const Sale = () => {
  const { data: products } = useGetFlashProductsQuery("");
  return (
    <div>
      <div className="p-10">
        <h1 className="text-3xl font-bold text-center mb-8 ">Flash Sale</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.data?.slice(0, 3)?.map((product: any) => (
            <div
              key={product?._id}
              className="p-4 border rounded-lg hover:shadow-md transition"
            >
              <img
                src={product?.image}
                alt={product?.name}
                className="rounded-lg mb-4 object-cover h-40 w-full"
              />
              <h4 className="text-lg font-semibold mb-2">{product?.name}</h4>
              <p className="text-sm text-gray-600">{product?.category?.name}</p>
              <Link
                to={`/products/${product?._id}`}
                className="text-blue-500 hover:underline mt-2 block"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sale;
