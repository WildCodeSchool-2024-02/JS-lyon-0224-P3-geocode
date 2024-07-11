// handleHomePage.js
import axios from "axios";

const Api = import.meta.env.VITE_API_URL;

// Loader for fetching station data
const loadStationData = async () => {
  const response = await axios.get(`${Api}/api/stations`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  if (response.status !== 200) {
    throw new Error("Failed to fetch station data");
  }

  return response.data;
};

export default loadStationData;
