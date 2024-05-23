import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomeLayout from "./pages/HomeLayout";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import RegisterLogin from "./components/RegisterLogin";
import Error from "./pages/Error";
import DashboardLayout from "./pages/DashboardLayout";
import AddProduct from "./pages/AddProduct";

import AllProducts from "./pages/AllProducts";


import Logout from "./components/Logout";
import { loader as userLoader } from "./components/Logout";

import { loader as allProductsLoader } from "./pages/AllProducts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    children: [
      {
        index: true,
        element: <RegisterLogin />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
    errorElement: <Error />,
  },
  {
    path: "/dashboard",
    element: <Logout />,
    loader: userLoader,
    children: [
      {
        path: "",
        element: <DashboardLayout />,
        children: [
          // {
          //   index: true,
          //   element: <HomeLayout />,
          // },
          {
            path: "addProduct",
            element: <AddProduct />,
          },

          {
            path: "allProducts",
            element: <AllProducts />,
            loader: allProductsLoader,
          },
         
        ],
      },
    ],
    errorElement: <Error />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;


