import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";

import {
  loadUserData,
  loadCarData,
  handleUserEdit,
  handleCarEdit,
} from "./API/handleEdit";
import loadStationData from "./API/HandleHompage";

// page components
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import ContactPage from "./pages/ContactPage";
import ProfilePage from "./pages/ProfilePage";
import ProfileAccess from "./pages/ProfileAccess";
import SignUp from "./pages/SignUp";
import CarSignUp from "./pages/SignUpCar";
import EditCarPage from "./pages/EditCarPage";
import AdminPage from "./pages/AdminPage";

import SignInPage from "./pages/SignInPage";
import EditProfile from "./pages/EditProfile";
import ReservationPage from "./pages/ReservationPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: loadStationData,
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
        element: <SignInPage />,
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
        path: "/Profileaccess",
        element: <ProfileAccess />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/admin",
        element: <AdminPage />,
        loader: loadStationData,
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
      {
        path: "/rent/:stationId",
        element: <ReservationPage />,
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
