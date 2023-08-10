import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./views/LandingPage";
import DetailPage from "./views/DetailPage";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/detail/:id",
        element: <DetailPage />,
      },
    ],
  },
]);

export default router;
