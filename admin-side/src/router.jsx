import { createBrowserRouter, redirect } from "react-router-dom";
import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import Layout from "./components/Layout";
import CategoryPage from "./views/CategoryPage";
import RegisterPage from "./views/RegisterPage";
import AddProductPage from "./views/AddProductPage";
import EditProductPage from "./views/EditProductPage";

const router = createBrowserRouter([
  {
    element: <Layout />,
    loader: () => {
      const access_token = localStorage.getItem("access_token");
      if (!access_token) throw redirect("/login");
      return null;
    },
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/categories",
        element: <CategoryPage />,
      },
      {
        path: "/addproduct",
        element: <AddProductPage />,
      },
      {
        path: "/editproduct/:id",
        element: <EditProductPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader: () => {
      const access_token = localStorage.getItem("access_token");
      if (access_token) throw redirect("/");
      return null;
    },
  },
]);

export default router;
