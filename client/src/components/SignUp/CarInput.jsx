import PropTypes from "prop-types";

function CarInput({ car, handleCarChange, handleRemoveCar }) {
  return (
    <div>
      <label className="input-control">
        <span className="label-title">Car Brand:</span>
        <input
          className="input container"
          type="text"
          name="brand"
          value={car.brand}
          onChange={(e) => {
            handleCarChange(car.key, e);
          }}
          placeholder="Car Brand"
        />
      </label>
      <label className="input-control">
        <span className="label-title">Car Model:</span>
        <input
          className="input container"
          type="text"
          name="model"
          value={car.model}
          onChange={(e) => {
            handleCarChange(car.key, e);
          }}
          placeholder="Car Model"
        />
      </label>
      <label className="input-control">
        <span className="label-title">Socket Type:</span>
        <select
          className="input container"
          name="socket"
          value={car.socket}
          onChange={(e) => {
            handleCarChange(car.key, e);
          }}
        >
          <option value="">Select Socket Type</option>
          <option value="Type 1">Type 1</option>
          <option value="Type 2">Type 2</option>
          <option value="Type 3">Type 3</option>
          <option value="Type 4">Type 4</option>
          <option value="Type 5">Type 5</option>
        </select>
      </label>
      <button
        type="button"
        onClick={() => {
          handleRemoveCar(car.key);
        }}
        className="button"
      >
        Remove Car
      </button>
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
};

export default CarInput;
