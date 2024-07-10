// src/utils/apiService.js

import axios from "axios";

const Api = import.meta.env.VITE_API_URL;

const handleRent = async ({ userId, stationId, carId, startTime, endTime }) => {
  try {
    const response = await axios.post(
      `${Api}/api/stations/rent`,
      {
        userId,
        stationId,
        carId,
        startTime,
        endTime,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (response.status !== 201) {
      const errorData = response.data;
      console.error("Reservation creation failed:", errorData.message);
      return { error: errorData.message };
    }

    return { success: true, id: response.data.id };
  } catch (error) {
    console.error("Error making reservation:", error);
    return { error: error.message };
  }
};

export default handleRent;
