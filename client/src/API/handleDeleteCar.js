import axios from "axios";
import notify from "../poptoastify/notify";

const Api = import.meta.env.VITE_API_URL;

const deleteCar = async (carId) => {
  try {
    const response = await axios.delete(`${Api}/api/cars/${carId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      notify("Car deleted successfully", "success");
    } else {
      throw new Error("Failed to delete car");
    }
  } catch (err) {
    console.error("Error deleting car:", err);
    notify("Failed to delete car", "error");
  }
};

const getCarsByUserId = async (userId) => {
  try {
    const response = await axios.get(`${Api}/api/cars/${userId}`);
    return response.data;
  } catch (err) {
    console.error("Error fetching user cars:", err);
  }
  return [];
};

export default { deleteCar, getCarsByUserId };
