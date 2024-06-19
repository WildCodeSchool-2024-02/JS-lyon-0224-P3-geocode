import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";

import App from "./App";

// page components
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import ContactPage from "./pages/ContactPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfile from "./pages/EditProfile";

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
          if (response.status !== 200) {
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
      {
        path: "/profile/edit/:id",
        element: <EditProfile />,
        loader: async ({ params }) => {
          const response = await axios.get(`${Api}/api/users/${params.id}`);
          return response.data;
        },
        action: async ({ request, params }) => {
          const formData = await request.formData();

          switch (request.method.toLowerCase()) {
            case "put": {
              await axios.put(`${Api}/api/users/${params.id}`, {
                firstname: formData.get("firstname"),
                lastname: formData.get("lastname"),
                email: formData.get("email"),
                city: formData.get("city"),
                image: formData.get("image"),
              });

              return redirect(`/profile`);
            }
            default:
              throw new Response("", { status: 405 });
          }
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
