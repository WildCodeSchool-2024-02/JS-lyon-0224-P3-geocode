import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import StationInfo from "./components/Homepage/StationInfo";
import NavBar from "./components/Navbar/NavBar";
import Map from "./components/Homepage/Map";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/",
    element: <StationInfo />,
  },
  {
    path: "/",
    element: <NavBar />,
  },
  {
    path: "/",
    element: <Map />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
