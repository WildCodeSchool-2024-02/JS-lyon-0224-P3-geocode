const Api = import.meta.env.VITE_API_URL;

const handleSignIn = async ({ signInData }) => {
  try {
    const response = await fetch(`${Api}/api/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(signInData),
    });

    if (response.status !== 200) {
      const errorData = await response.json();
      return { error: errorData.message };
    }

    const data = await response.json();

    return { success: true, user: data.user.email, id: data.user.id };
  } catch (error) {
    console.error("Error in handleSignIn:", error);
    return { error: error.message };
  }
};

export default handleSignIn;
