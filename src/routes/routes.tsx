import App from "@/App";
import AboutUs from "@/pages/AboutUs";
import Contact from "@/pages/Contact";
import Error from "@/pages/Error";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { routeGenerator } from "@/utils/routesGenerator";
import { createBrowserRouter } from "react-router-dom";
import { userPaths } from "./userRoutes";
import { adminPaths } from "./adminRoutes";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import ProfilePage from "@/pages/GetMe";
import ProductDetails from "@/pages/ProductDetails";
import Shop from "@/pages/Shop";
import { vendorPaths } from "./vendorRoutes";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import AllProducts from "@/pages/AllProducts";
import FlashSalePage from "@/components/Banner/FlashSalePage";
import CompareList from "@/components/Comparison/CompareList";
import RecentProducts from "@/pages/RecentProducts";
import AllShops from "@/pages/AllShops";
import Dashboard from "@/components/Dashboard/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/about-us",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/all-products",
        element: <AllProducts></AllProducts>,
      },
      {
        path: "/shops",
        element: <AllShops></AllShops>,
      },
      {
        path: "/products/:productId",
        element: <ProductDetails></ProductDetails>,
      },
      {
        path: "/shops/:shopId",
        element: <Shop></Shop>,
      },
      {
        path: "/flash-sale",
        element: <FlashSalePage></FlashSalePage>,
      },
      {
        path: "/compare",
        element: <CompareList></CompareList>,
      },
      {
        path: "/recent-products",
        element: <RecentProducts></RecentProducts>,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <Dashboard></Dashboard>
      </ProtectedRoute>
    ),
    errorElement: <Error></Error>,
    children: routeGenerator(adminPaths),
  },
  {
    path: "/customer",
    element: (
      <ProtectedRoute role="customer">
        <Dashboard></Dashboard>
      </ProtectedRoute>
    ),
    errorElement: <Error></Error>,
    children: routeGenerator(userPaths),
  },
  {
    path: "/vendor",
    element: (
      <ProtectedRoute role="vendor">
        <Dashboard></Dashboard>
      </ProtectedRoute>
    ),
    errorElement: <Error></Error>,
    children: routeGenerator(vendorPaths),
  },
  {
    path: "/get-me",
    element: <App></App>,
    children: [
      {
        index: true,
        element: <ProfilePage></ProfilePage>,
      },
    ],
  },

  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <Register></Register>,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword></ForgotPassword>,
  },
  {
    path: "/reset-password",
    element: <ResetPassword></ResetPassword>,
  },
]);

export default router;
