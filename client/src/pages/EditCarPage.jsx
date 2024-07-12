import { useState, useEffect } from "react";
import { useLoaderData, useNavigate, Form } from "react-router-dom";
import axios from "axios";
import { getCarsByUserId, deleteCar } from "../API/handleDeleteCar";
import porsche from "../assets/image/porsche.jpeg";
import "../Styles/EditCar.css";

import notify from "../poptoastify/notify";

const Api = import.meta.env.VITE_API_URL;

export default function EditCarPage() {
  const car = useLoaderData();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    socket: "",
    user_id: car.user_id, // Ensure to keep the user_id in the form data
  });

  useEffect(() => {
    if (car !== null) {
      setFormData({
        brand: car.brand || "",
        model: car.model || "",
        socket: car.socket || "",
        user_id: car.user_id || "",
      });
    }
  }, [car]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = async () => {
    try {
      const userCarsCount = await getCarsByUserId(formData.user_id);

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const params = { carId: car.id };

    const editFormData = {
      brand: formData.brand,
      model: formData.model,
      socket: formData.socket,
      user_id: formData.user_id,
    };

    try {
      await axios.put(
        `${Api}/api/cars/${params.carId}`,
        editFormData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );



      navigate(`/profile`);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      notify("Failed to update car", "error");
    }
  };

  return (
    <Form method="put" className="edit-form" onSubmit={handleSubmit}>
      <img src={porsche} alt="porsche" className="img" />
      <div className="edit-box">
        <label className="edit-label">
          <span className="label-title">Car Brand:</span>
          <input
            className="edit-input container"
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
          />
        </label>
        <label className="edit-label">
          <span className="label-title">Car Model:</span>
          <input
            className="edit-input container"
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
          />
        </label>
        <label className="edit-label">
          <span className="label-title">Car Socket:</span>
          <select
            className="input container"
            name="socket"
            value={formData.socket}
            onChange={handleChange}
          >
            <option value="">current: {car.socket}</option>
            <option value="T2">T2</option>
            <option value="E/F">E/F</option>
            <option value="T3">T3</option>
            <option value="Combo">Combo</option>
            <option value="Chademo">Chademo</option>
          </select>
        </label>
      </div>
      <div className="edit-buttons">
        <button type="submit" className="button">
          save
        </button>
        <button type="button" className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </Form>
  );
}
