import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";

// page components
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import ContactPage from "./pages/ContactPage";
import ProfilePage from "./pages/ProfilePage";

const Api = import.meta.env.VITE_API_URL;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: async () => {
          const response = await fetch(`${Api}/api/stations`);
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
        path: "/Profile/:id/cars",
        element: <ProfilePage />,
        loader: async ({ params }) => {
          const response = await fetch(`${Api}/api/users/${params.id}/cars`);
          if (!response.ok) {
            throw new Error("Failed to fetch profile data");
          }
          const data = await response.json();
          return data;
        },
        catch(error) {
          // Log the error for debugging purposes
          console.error("Error fetching profile data:", error);
          // Rethrow the error to be handled by the caller
          throw error;
        },
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
