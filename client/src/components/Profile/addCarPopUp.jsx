import { useState } from "react";
import propTypes from "prop-types";
import "../../Styles/PopUp.css";
import notify from "../../poptoastify/notify";

export default function AddCarPopUp({ onClose, onSubmit }) {
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

    const response = await onSubmit(formData);
    if (response?.error) {
      setSubmissionStatus({ error: response.error });
      notify(response.error, "error");
    } else {
      setSubmissionStatus({ success: "Car added successfully!" });
      notify("Car added successfully!", "success");
      setFormData({
        brand: "",
        model: "",
        socket: "",
      });
      onClose();
    }
  };

  return (
    <div className="popup container">
      <form onSubmit={handleSubmit} className="addCarForm">
        <label>
          <span className="label-title">Car Brand:</span>
          <input
            className="inputAddCar"
            type="text"
            name="brand"
            placeholder="Car Brand"
            value={formData.brand}
            onChange={handleChange}
          />
          {errors.brand && <span className="error">{errors.brand}</span>}
        </label>
        <label>
          <span className="label-title">Car Model:</span>
          <input
            className="inputAddCar container"
            type="text"
            name="model"
            placeholder="Car Model"
            value={formData.model}
            onChange={handleChange}
          />
          {errors.model && <span className="error">{errors.model}</span>}
        </label>
        <label>
          <span className="label-title">Socket Type:</span>
          <select
            className="inputAddCar container"
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
        <div className="btn-component">
          <button type="submit" className="button">
            Add Car
          </button>
          {submissionStatus?.error && (
            <span className="error">{submissionStatus.error}</span>
          )}
          {submissionStatus?.success && (
            <span className="success">{submissionStatus.success}</span>
          )}
          <button type="button" className="deletebtn" onClick={onClose}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
}

AddCarPopUp.propTypes = {
  onClose: propTypes.func.isRequired,
  onSubmit: propTypes.func.isRequired,
};
