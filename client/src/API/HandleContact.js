import axios from "axios";

const Api = import.meta.env.VITE_API_URL;

const handleContact = async (contactData) => {
  try {
    const response = await axios.post(`${Api}/api/contact/add`, contactData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 201) {
      return { error: response.data.message };
    }
    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
};

export default handleContact;
