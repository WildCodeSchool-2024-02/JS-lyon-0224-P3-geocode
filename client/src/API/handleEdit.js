import axios from "axios";
import { redirect } from "react-router-dom";

const Api = import.meta.env.VITE_API_URL;

// Loader for fetching user data
export const loadUserData = async () => {
  const response = await axios.get(`${Api}/api/users/profile`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return response.data;
};

// Loader for fetching car data
export const loadCarData = async ({ params }) => {
  const response = await axios.get(`${Api}/api/cars/${params.carId}`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return response.data;
};

// Action for handling user edit
export const handleUserEdit = async ({ request, params }) => {
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
};

// Action for handling car edit
export const handleCarEdit = async ({ request, params }) => {
  const formData = await request.formData();
  switch (request.method.toLowerCase()) {
    case "put": {
      await axios.put(`${Api}/api/cars/${params.carId}`, {
        brand: formData.get("brand"),
        model: formData.get("model"),
        socket: formData.get("socket"),
        user_id: formData.get("user_id"),
        id: params.carId,
      });
      return redirect(`/profile/${formData.get("user_id")}`);
    }
    default:
      throw new Response("", { status: 405 });
  }
};
