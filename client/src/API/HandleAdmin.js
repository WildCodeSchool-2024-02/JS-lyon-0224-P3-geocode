import axios from "axios";

const Api = import.meta.env.VITE_API_URL;

// Loader for fetching user data
const loadAdminData = async () => {
  try {
    const response = await axios.get(`${Api}/api/admin`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (response.status !== 200) {
      throw new Error("Failed to fetch profile data");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching admin data:", error);
    throw error;
  }
};

export default loadAdminData;
