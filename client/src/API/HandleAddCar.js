import axios from "axios";

const Api = import.meta.env.VITE_API_URL;

const addCar = async (car, userId) => {
  try {
    const response = await axios.post(`${Api}/api/cars`, {
      brand: car.brand,
      model: car.model,
      socket: car.socket,
      userId,
    });

    if (response.status !== 201) {
      const errorData = response.data;
      console.error("Car creation failed:", errorData.message);
      return { error: errorData.message };
    }

    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error in addCar:", error);
    return { error: error.message };
  }
};

export default addCar;
