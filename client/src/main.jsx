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
import ProfileAccess from "./pages/ProfileAccess";
import SignUp from "./pages/SignUp";
import CarSignUp from "./pages/SignUpCar";

import SignInPage from "./components/SignIn/SignIn";
import EditProfile from "./pages/EditProfile";

const Api = import.meta.env.VITE_API_URL;



const handleContact = async (contactData) => {
  try {
    const response = await fetch(`${Api}/api/contact/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });

    if (response.status !== 201) {
      const errorData = await response.json();
      return { error: errorData.message };
    }
    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
};

const handleSignIn = async ({ signInData }) => {
  try {
    const response = await fetch(`${Api}/api/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signInData),
    });

    if (response.status !== 201) {
      const errorData = await response.json();
      return { error: errorData.message };
    }

    const data = await response.json();
    return { success: true, id: data.id };
  } catch (error) {
    console.error("Error in handleSignIn:", error);
    return { error: error.message };
  }
};

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
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/signup/car",
        element: <CarSignUp />,
      },
      {
        path: "/signin",
        element: <SignInPage handleSignIn={handleSignIn} />,
      },
      {
        path: "/About-us",
        element: <AboutUsPage />,
      },
      {
        path: "/Contact",
        element: <ContactPage handleContact={handleContact} />,
      },
      {
        path: "/Profile",
        element: <ProfileAccess />,
      },
      {
        path: "/Profile/:id/",
        element: <ProfilePage />,
        loader: async ({ params }) => {
          const response = await fetch(`${Api}/api/users/${params.id}`);
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
        path: "/profile/:id/edit",
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
                id: params.id,
              });

              return redirect(`/profile/${params.id}`);
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
