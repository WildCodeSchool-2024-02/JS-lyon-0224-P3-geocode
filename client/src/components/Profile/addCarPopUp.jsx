import { useState } from "react";
import addCar from "../../API/HandleAddCar";

export default function AddCarPopUp() {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    socket: "",
  });
  const [errors, setErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const validateInput = (name, value) => {
    const minLength = name === "brand" ? 3 : 2;
    if (value.trim() === "") {
      return `Car ${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }
    if (value.length < minLength) {
      return `Car ${name.charAt(0).toUpperCase() + name.slice(1)} must be at least ${minLength} characters long`;
    }
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const error = validateInput(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = Object.keys(formData).reduce((acc, key) => {
      const error = validateInput(key, formData[key]);
      if (error) {
        acc[key] = error;
      }
      return acc;
    }, {});

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const response = await addCar(formData);
    if (response.error) {
      setSubmissionStatus({ error: response.error });
    } else {
      setSubmissionStatus({ success: "Car added successfully!" });
      setFormData({
        brand: "",
        model: "",
        socket: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="input-control">
        <span className="label-title">Car Brand:</span>
        <input
          className="input container"
          type="text"
          name="brand"
          placeholder="Car Brand"
          value={formData.brand}
          onChange={handleChange}
        />
        {errors.brand && <span className="error">{errors.brand}</span>}
      </label>
      <label className="input-control">
        <span className="label-title">Car Model:</span>
        <input
          className="input container"
          type="text"
          name="model"
          placeholder="Car Model"
          value={formData.model}
          onChange={handleChange}
        />
        {errors.model && <span className="error">{errors.model}</span>}
      </label>
      <label className="input-control">
        <span className="label-title">Socket Type:</span>
        <select
          className="input container"
          name="socket"
          value={formData.socket}
          onChange={handleChange}
        >
          <option value="">Select Socket Type</option>
          <option value="T2">T2</option>
          <option value="E/F">E/F</option>
          <option value="T3">T3</option>
          <option value="Combo">Combo</option>
          <option value="Chademo">Chademo</option>
        </select>
        {errors.socket && <span className="error">{errors.socket}</span>}
      </label>
      <button type="submit" className="button">
        Submit
      </button>
      {submissionStatus?.error && (
        <span className="error">{submissionStatus.error}</span>
      )}
      {submissionStatus?.success && (
        <span className="success">{submissionStatus.success}</span>
      )}
    </form>
  );
}
