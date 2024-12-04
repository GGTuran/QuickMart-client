import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { clearComparison } from "@/redux/features/comparison/comparisonSlice";
import Loading from "../Loading/Loading";
import { fetchProductById } from "@/utils/utils";

const CompareTable = () => {
  const dispatch = useAppDispatch();
  const selectedProducts = useAppSelector(
    (state) => state?.comparison?.selectedProducts
  );
  const [productArray, setProductArray] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productPromises = selectedProducts.map((id) =>
          fetchProductById(id)
        ); // Fetch product by id
        const products = await Promise.all(productPromises);
        setProductArray(products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedProducts?.length > 0) {
      fetchProducts();
    } else {
      setProductArray([]);
    }
  }, [selectedProducts]);

  if (loading) return <Loading />;
  console.log(productArray, "productArray");

  if (productArray.length === 0)
    return <p className="text-center">No products selected for comparison.</p>;

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold mb-4">Product Comparison</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Feature</TableCell>
            {productArray?.map((product) => (
              <TableCell key={product._id}>{product?.data?.name}</TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Price</TableCell>
            {productArray.map((product) => (
              <TableCell key={product?._id}>${product?.data?.price}</TableCell>
            ))}
          </TableRow>
          {productArray[0].data?.discount !== undefined && (
            <TableRow>
              <TableCell>Discount</TableCell>
              {productArray.map((product) => (
                <TableCell key={product._id}>
                  {product?.data?.discount}%
                </TableCell>
              ))}
            </TableRow>
          )}
          <TableRow>
            <TableCell>Inventory Count</TableCell>
            {productArray.map((product) => (
              <TableCell key={product._id}>
                {product?.data?.inventoryCount}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
      <Button
        variant="destructive"
        onClick={() => dispatch(clearComparison())}
        className="mt-4"
      >
        Clear All
      </Button>
    </div>
  );
};

export default CompareTable;
