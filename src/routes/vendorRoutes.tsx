import ProductContainer from "@/components/ManageProducts/ProductContainer";
import VendorShop from "@/pages/VendorShop";

export const vendorPaths = [
  {
    path: "manage-products",
    element: <ProductContainer></ProductContainer>,
  },
  {
    path: "shop",
    element: <VendorShop></VendorShop>,
  },
];
