import PropTypes from "prop-types";
import "../../Styles/SignUpCars.css";

function CarInput({
  car,
  handleCarChange,
  handleRemoveCar,
  setError,
  setSuccess,
  showRemoveButton,
}) {
  const validateInput = (e) => {
    const { name, value } = e.target;
    const minLength = name === "brand" ? 3 : 2; // Adjust minLength based on the field

    if (value.trim() === "") {
      setError(
        name,
        `Car ${name.charAt(0).toUpperCase() + name.slice(1)} is required`
      );
    } else if (value.length < minLength) {
      setError(
        name,
        `Car ${name.charAt(0).toUpperCase() + name.slice(1)} must be at least ${minLength} characters long`
      );
    } else {
      setSuccess(name);
    }
  };

  const handleInputChange = (key, e) => {
    handleCarChange(key, e);
    validateInput(e);
  };

  return (
    <div className="car-signup">
      <label>
        <span className="label-title">Car Brand:</span>
        <input
          className="input container"
          type="text"
          name="brand"
          value={car.brand}
          onChange={(e) => handleInputChange(car.key, e)}
          onBlur={validateInput}
          placeholder="Car Brand"
        />
      </label>
      <label>
        <span className="label-title">Car Model:</span>
        <input
          className="input container"
          type="text"
          name="model"
          value={car.model}
          onChange={(e) => handleInputChange(car.key, e)}
          onBlur={validateInput}
          placeholder="Car Model"
        />
      </label>
      <label>
        <span className="label-title">Socket Type:</span>
        <select
          className="input container"
          name="socket"
          value={car.socket}
          onChange={(e) => handleCarChange(car.key, e)}
        >
          <option value="">Select Socket Type</option>
          <option value="T2">T2</option>
          <option value="E/F">E/F</option>
          <option value="T3">T3</option>
          <option value="Combo">Combo</option>
          <option value="Chademo">Chademo</option>
        </select>
      </label>
      {showRemoveButton && (
        <button
          type="button"
          onClick={() => handleRemoveCar(car.key)}
          className="deletebtn"
        >
          Remove Car
        </button>
      )}
    </div>
  );
}

CarInput.propTypes = {
  car: PropTypes.shape({
    key: PropTypes.number.isRequired,
    brand: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    socket: PropTypes.string.isRequired,
  }).isRequired,
  handleCarChange: PropTypes.func.isRequired,
  handleRemoveCar: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  setSuccess: PropTypes.func.isRequired,
  showRemoveButton: PropTypes.bool.isRequired, // Added new prop type
};

export default CarInput;
