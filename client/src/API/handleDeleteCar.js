import axios from "axios";
import notify from "../poptoastify/notify";

const Api = import.meta.env.VITE_API_URL;

export const deleteCar = async (carId) => {
  try {
    const response = await axios.delete(`${Api}/api/cars/${carId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (response.status !== 201) {
      notify("Car deleted successfully", "success");
    } else {
      throw new Error("Failed to delete car");
    }
  } catch (err) {
    console.error("Error deleting car:", err);
    notify("Failed to delete car", "error");
  }
};

export const getCarsByUserId = async (userId) => {
  try {
    const response = await axios.get(`${Api}/api/cars/byUser/${userId}`);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to fetch user cars");
  } catch (err) {
    console.error("Error fetching user cars:", err);
    notify("Failed to fetch user cars", "error");
  }
  return [];
};
