import Coupon from "@/components/Coupon/Coupon";
import AllOrders from "@/pages/AllOrders";
import CategoryManagement from "@/pages/CategoryManagement";
import ShopManagement from "@/pages/ShopManagement";
import UserManagement from "@/pages/UserManagement";
import NewsLetterManagement from "@/components/Newsletter/NewsLetterManagement";

export const adminPaths = [
  {
    path: "user-management",
    element: <UserManagement></UserManagement>,
  },
  {
    path: "category-management",
    element: <CategoryManagement></CategoryManagement>,
  },
  {
    path: "shop-management",
    element: <ShopManagement></ShopManagement>,
  },
  {
    path: "all-orders",
    element: <AllOrders></AllOrders>,
  },
  {
    path: "news-letter",
    element: <NewsLetterManagement></NewsLetterManagement>,
  },
  {
    path: "coupon",
    element: <Coupon></Coupon>,
  },
];
