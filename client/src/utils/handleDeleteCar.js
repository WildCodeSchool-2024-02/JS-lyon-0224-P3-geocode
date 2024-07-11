import notify from "../poptoastify/notify";

const Api = import.meta.env.VITE_API_URL;

export const deleteCar = async (carId) => {
  try {
    const response = await fetch(`${Api}/api/cars/${carId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      notify("Car deleted successfully", "success");
    } else {
      throw new Error("Failed to delete car");
    }
  } catch (err) {
    console.error("Error deleting car:", err);
    notify("Failed to delete car", "error");
  }
};

export const getCarsByUserId = async (userId) => {
  try {
    const response = await fetch(`${Api}/api/cars/byUser/${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch user cars");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching user cars:", err);
    notify("Failed to fetch user cars", "error");
  }
  return [];
};
