import { createBrowserRouter } from "react-router-dom";
import HomePage from "./views/HomePage";
import RegisterPage from "./views/RegisterPage";
import LoginPage from "./views/LoginPage";
import Layout from "./components/Layout";

const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <HomePage/>,
      }
    ]
  },
  {
    path: "/register",
    element: <RegisterPage/>
  },
  {
    path: "/login",
    element: <LoginPage/>
  }
]);

export default router;
