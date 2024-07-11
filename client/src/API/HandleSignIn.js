import axios from "axios";

const Api = import.meta.env.VITE_API_URL;

const handleSignIn = async ({ signInData }) => {
  try {
    const response = await axios.post(`${Api}/api/signin`, signInData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (response.status !== 200) {
      const errorData = response.data;
      return { error: errorData.message };
    }

    const { data } = response;

    return { success: true, user: data.user.email, id: data.user.id };
  } catch (error) {
    console.error("Error in handleSignIn:", error);
    return { error: error.message };
  }
};

export default handleSignIn;
