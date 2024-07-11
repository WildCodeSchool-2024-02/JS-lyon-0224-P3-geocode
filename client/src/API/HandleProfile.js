// handleProfile.js
import axios from "axios";

const Api = import.meta.env.VITE_API_URL;

// Loader for fetching user data
const loadUserData = async ({ params }) => {
  const response = await axios.get(`${Api}/api/users/${params.id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  if (response.status !== 200) {
    throw new Error("Failed to fetch profile data");
  }

  return response.data;
};

export default loadUserData;
