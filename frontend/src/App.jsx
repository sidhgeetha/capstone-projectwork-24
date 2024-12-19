import React from "react";
import { ToastContainer } from "react-toastify";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import RegisterLogin from "./components/RegisterLogin";
import Error from "./pages/Error";
import DashboardLayout from "./pages/DashboardLayout";
import AddProduct from "./pages/AddProduct";



import { loader as allProductsLoader } from "./pages/AllProducts";

const router = createBrowserRouter([
  {
    path: "/",
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
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    loader: allProductsLoader,
    children: [
      {
        path: "addProduct",
        element: <AddProduct />,
      },
     
    ],
    errorElement: <Error />,
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
};

export default App;
