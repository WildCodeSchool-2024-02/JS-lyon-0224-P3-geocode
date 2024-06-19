import propTypes from "prop-types";
import "./UserCars.css";

import porsche from "../../assets/image/porsche.jpeg";

export default function UserCars({ cars }) {
  if (!cars || cars.length === 0) {
    return <div className="no-cars">No cars found.</div>;
  }

  return (
    <div className="user-cars container">
      <h3>User's Cars:</h3>
      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            <h4>
              {car.brand} {car.model}
            </h4>
            <img src={porsche} alt="porsche" className="img" />

            <p>Socket: {car.socket}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

UserCars.propTypes = {
  cars: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string.isRequired,
      brand: propTypes.string.isRequired,
      model: propTypes.string.isRequired,
      socket: propTypes.string.isRequired,
    })
  ).isRequired,
};
