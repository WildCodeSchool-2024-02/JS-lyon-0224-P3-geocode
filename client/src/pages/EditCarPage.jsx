import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import { getCarsByUserId, deleteCar } from "../API/HandleDeleteCar";
import notify from "../poptoastify/notify";
import EditCarForm from "../components/Profile/EditCarForm";

const Api = import.meta.env.VITE_API_URL;

export default function EditCarPage() {
  const car = useLoaderData();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const userCarsCount = await getCarsByUserId(car.user_id);

      if (userCarsCount > 1) {
        await deleteCar(car.id);
        navigate(`/profile`);
      } else {
        notify("You must have at least one car", "error");
      }
    } catch (error) {
      console.error("Error in handleDelete:", error);
      notify("Failed to delete car", "error");
    }
  };

  const handleSubmit = async (formData) => {
    const params = { carId: car.id };

    try {
      await axios.put(`${Api}/api/cars/${params.carId}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      navigate(`/profile`);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };

  return (
    <EditCarForm car={car} onSubmit={handleSubmit} onDelete={handleDelete} />
  );
}
