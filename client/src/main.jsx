import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import HomePage from "./pages/HomePage";

// page components
import AboutUsPage from "./pages/AboutUsPage";
import ContactPage from "./pages/ContactPage";
import ProfilePage from "./pages/ProfilePage";

const stationApi = import.meta.env.VITE_API_URL;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: async () => {
          const response = await fetch(`${stationApi}/api/stations`);
          const data = await response.json();
          return data;
        },
      },
      {
        path: "/About-us",
        element: <AboutUsPage />,
      },
      {
        path: "/Contact",
        element: <ContactPage />,
      },
      {
        path: "/Profile",
        element: <ProfilePage />,
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
