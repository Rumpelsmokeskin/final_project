import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SaunaList from "./components/SaunaList.tsx";
import CartList from "./components/CartList.tsx";
import Root from "./Root.tsx";
import About from "./components/About.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
      {
        path: "/",
        element: <SaunaList/>,
      },
      {
        path: "/cart",
        element: <CartList/>,
      },
      {
        path: "/about",
        element: <About/>,
      }
    ]
  },
  
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
