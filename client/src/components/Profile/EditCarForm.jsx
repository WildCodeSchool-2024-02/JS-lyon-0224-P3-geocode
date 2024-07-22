import React from "react";
import PropTypes from "prop-types";
import porsche from "../../assets/image/porsche.jpeg";
import "../../Styles/EditCar.css";

export default function EditCarForm({ car, onSubmit, onDelete }) {
  const [formData, setFormData] = React.useState({
    brand: car.brand || "",
    model: car.model || "",
    socket: car.socket || "",
    user_id: car.user_id || "",
  });

  const [formErrors, setFormErrors] = React.useState({
    brand: "",
    model: "",
  });

  const setError = (name, message) => {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: message,
    }));
  };

  const setSuccess = (name) => {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateInputs = () => {
    const { brand, model } = formData;
    const fields = [
      {
        name: "brand",
        value: brand,
        message: "brand is required",
        minLength: 2,
        errorMessage: "Brand must be at least 2 characters long",
      },
      {
        name: "model",
        value: model,
        message: "model is required",
        minLength: 2,
        errorMessage: "Model must be at least 2 characters long",
      },
    ];

    let allValid = true;

    fields.forEach(
      ({ name, value, message, errorMessage, minLength, match }) => {
        if (value.trim() === "") {
          setError(name, message);
          allValid = false;
        } else if (minLength && value.length < minLength) {
          setError(name, errorMessage);
          allValid = false;
        } else if (match !== undefined && value !== match) {
          setError(name, errorMessage);
          allValid = false;
        } else {
          setSuccess(name);
        }
      }
    );

    return allValid;
  };

  React.useEffect(() => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      onSubmit(formData);
    }
  };

  return (
    <form className="edit-car" onSubmit={handleSubmit}>
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
          {formErrors.brand !== "" && (
            <div className="error">{formErrors.brand}</div>
          )}
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
          {formErrors.model !== "" && (
            <div className="error">{formErrors.model}</div>
          )}
        </label>
        <label className="edit-label">
          <span className="label-title">Car Socket:</span>
          <select
            className="edit-input container"
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
          Save
        </button>
        <button type="button" className="deletebtn" onClick={onDelete}>
          Delete
        </button>
      </div>
    </form>
  );
}

EditCarForm.propTypes = {
  car: PropTypes.shape({
    id: PropTypes.number.isRequired,
    brand: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    socket: PropTypes.string.isRequired,
    user_id: PropTypes.number.isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
