import {
  addProductToCompare,
  removeProductFromCompare,
} from "@/redux/features/comparison/comparisonSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { TProduct } from "@/types/product.interface";

interface ProductCardProps {
  product: TProduct;
}

const CompareCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const selectedProducts = useAppSelector(
    (state) => state?.comparison?.selectedProducts
  );
  const isSelected = selectedProducts?.includes(product?._id);

  const handleCompareToggle = () => {
    console.log(product?._id, "from card");
    if (isSelected) {
      dispatch(removeProductFromCompare(product?._id));
    } else {
      dispatch(addProductToCompare(product?._id));
    }
  };

  return (
    <Card className="w-full max-w-sm p-4 shadow-md">
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Price: ${product.price}</p>
        {product.discount && <p>Discount: {product.discount}%</p>}
        <p>Stock: {product.inventoryCount}</p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="outline" onClick={handleCompareToggle}>
          {isSelected ? "Remove from Compare" : "Compare"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CompareCard;
