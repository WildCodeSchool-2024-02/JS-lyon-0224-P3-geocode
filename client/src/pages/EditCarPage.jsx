import { useState, useEffect } from "react";
import { useLoaderData, useNavigate, Form } from "react-router-dom";
import porsche from "../assets/image/porsche.jpeg";

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
      const response = await fetch(`${Api}/api/cars/${params.carId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editFormData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      navigate(`/profile/${formData.user_id}`);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
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
            <option value="Type 1">T2</option>
            <option value="Type 2">E/F</option>
            <option value="Type 3">T3</option>
            <option value="Type 4">Combo</option>
            <option value="Type 5">Chademo</option>
          </select>
        </label>
      </div>
      <button type="submit" className="button">
        save
      </button>
    </Form>
  );
}
