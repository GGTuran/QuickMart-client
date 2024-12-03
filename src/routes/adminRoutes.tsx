import CategoryManagement from "@/pages/CategoryManagement";
import ShopManagement from "@/pages/ShopManagement";
import UserManagement from "@/pages/UserManagement";

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
];
