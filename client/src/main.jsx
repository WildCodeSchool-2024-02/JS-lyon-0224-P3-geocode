import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Homepage from "./pages/Homepage";

// page components
import Aboutuspage from "./pages/Aboutuspage";
import Contactpage from "./pages/Contactpage";
import Profilepage from "./pages/Profilepage";

const stationApi = import.meta.env.VITE_API_URL;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />,
        loader: async () => {
          const response = await fetch(`${stationApi}/api/stations`);
          const data = await response.json();
          return data;
        },
      },
      {
        path: "/About-us",
        element: <Aboutuspage />,
      },
      {
        path: "/Contact",
        element: <Contactpage />,
      },
      {
        path: "/Profile",
        element: <Profilepage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
