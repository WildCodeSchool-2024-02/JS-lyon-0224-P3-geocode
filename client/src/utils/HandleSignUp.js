// handleSignUp.js
import axios from "axios";

const Api = import.meta.env.VITE_API_URL;

const handleSignUp = async ({ user, cars }) => {
  try {
    // Step 1: Create the user
    const userResponse = await axios.post(`${Api}/api/users`, {
      firstname: user.firstname,
      lastname: user.lastname,
      city: user.city,
      email: user.email,
      password: user.password,
    });

    if (userResponse.status !== 201) {
      const errorData = userResponse.data;
      console.error("User creation failed:", errorData.message);
      return { error: errorData.message };
    }

    const userId = userResponse.data.insertId;

    // Step 2: Create cars for the user
    cars.forEach(async (car) => {
      const carResponse = await axios.post(`${Api}/api/cars`, {
        brand: car.brand,
        model: car.model,
        socket: car.socket,
        userId,
      });

      if (carResponse.status !== 201) {
        const errorData = carResponse.data;
        // Rollback user creation on car creation failure
        await axios.delete(`${Api}/api/users/${userId}`);
        console.error("Car creation failed:", errorData.message);
        return { error: errorData.message };
      }
      return null;
    });

    return { success: true };
  } catch (error) {
    console.error("Error in handleSignUp:", error);
    return { error: error.message };
  }
};

export default handleSignUp;
