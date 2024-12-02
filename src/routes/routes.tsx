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
        path: "/products/:productId",
        element: <ProductDetails></ProductDetails>,
      },
      {
        path: "/shops/:shopId",
        element: <Shop></Shop>,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <App></App>
      </ProtectedRoute>
    ),
    errorElement: <Error></Error>,
    children: routeGenerator(adminPaths),
  },
  {
    path: "/users",
    element: (
      <ProtectedRoute role="user">
        <App></App>
      </ProtectedRoute>
    ),
    errorElement: <Error></Error>,
    children: routeGenerator(userPaths),
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
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <Register></Register>,
  },
]);

export default router;
