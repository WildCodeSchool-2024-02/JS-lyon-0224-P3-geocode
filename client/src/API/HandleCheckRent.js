import axios from "axios";

const Api = import.meta.env.VITE_API_URL;

const handleCheckRent = async (userId) => {
  try {
    const response = await axios.get(`${Api}/api/stations/rent`, {
      params: { user_id: userId },
    });
    if (response.status === 200) {
      return response.data;
    }
    console.error("Failed to check rent: status", response.status);
    throw new Error("Failed to check rent");
  } catch (err) {
    console.error("Error checking rent:", err);
    return null;
  }
};

export default handleCheckRent;
