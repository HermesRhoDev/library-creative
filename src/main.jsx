// REACT IMPORT \\
import React from "react";
// CSS IMPORT \\
import ReactDOM from "react-dom/client";
import "./assets/styles/css/global.css";
import "./assets/styles/css/index.css";
// ROUTER IMPORT \\
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// PAGES \\
import { Dashboard } from "./pages/Dashboard";
import { Error404 } from "./pages/Error404";
import { Library } from "./pages/Library";
import { Signin } from "./pages/Signin";
// CONTEXT \\
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContextProvider from "./context/authContext";
import { Book } from "./pages/Book";
import { LibraryBook } from "./pages/LibraryBook";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Signin />,
    errorElement: <Error404 />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/dashboard/book/:id",
    element: <Book />,
  },
  {
    path: "/library",
    element: <Library />,
  },
  {
    path: "/library/book/:id",
    element: <LibraryBook />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <AuthContextProvider>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <RouterProvider router={router} />
    </AuthContextProvider>
  </>
);
