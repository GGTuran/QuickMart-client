import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Link } from "react-router-dom";
import { TProduct } from "@/types/product.interface";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const RecentProducts = () => {
  const recentlyViewed = useSelector(
    (state: RootState) => state.recentlyViewed.products
  );

  return (
    <div className="mt-8">
      <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">
        Recently Viewed Products
      </h2>
      {recentlyViewed.length === 0 ? (
        <p className="text-gray-500 text-center">
          No recently viewed products.
        </p>
      ) : (
        <div className="m-10 grid grid-cols-1 md:grid-cols-3  gap-6">
          {recentlyViewed.map((product: TProduct) => (
            <Card
              key={product._id}
              className="w-full hover:scale-105 transition-transform duration-200 ease-in-out"
            >
              <CardHeader className="flex flex-col items-center space-y-2">
                <img
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-32 sm:h-40 object-cover rounded-lg"
                />
                <CardTitle className="text-lg font-semibold text-center text-gray-900">
                  {product?.name}
                </CardTitle>
                <CardDescription className="text-sm text-gray-500 text-center">
                  ${product?.price?.toFixed(2)}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <Link
                  to={`/products/${product._id}`}
                  className="text-blue-500 text-sm font-semibold hover:underline"
                >
                  View Details
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentProducts;
