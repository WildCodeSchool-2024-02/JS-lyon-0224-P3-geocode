const Api = import.meta.env.VITE_API_URL;

const handleContact = async (contactData) => {
  try {
    const response = await fetch(`${Api}/api/contact/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });

    if (response.status !== 201) {
      const errorData = await response.json();
      return { error: errorData.message };
    }
    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
};

export default handleContact;
