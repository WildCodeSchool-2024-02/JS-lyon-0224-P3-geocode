import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";

import {
  loadUserData,
  loadCarData,
  handleUserEdit,
  handleCarEdit,
} from "./utils/handleEdit";

// page components
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import ContactPage from "./pages/ContactPage";
import ProfilePage from "./pages/ProfilePage";
import ProfileAccess from "./pages/ProfileAccess";
import SignUp from "./pages/SignUp";
import CarSignUp from "./pages/SignUpCar";
import EditCarPage from "./pages/EditCarPage";

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

    localStorage.setItem("token", data.token);

    return { success: true, id: data.user.id };
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
        path: "/Profile/:id",
        element: <ProfilePage />,
      },
      {
        path: "/profile/:id/edit",
        element: <EditProfile />,
        loader: loadUserData,
        action: handleUserEdit,
      },
      {
        path: "/editCar/:carId",
        element: <EditCarPage />,
        loader: loadCarData,
        action: handleCarEdit,
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
