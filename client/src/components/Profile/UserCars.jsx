import propTypes from "prop-types";
import "./UserCars.css";

import porsche from "../../assets/image/porsche.jpeg";

export default function UserCars({ cars }) {
  if (!cars || cars.length === 0) {
    return <div className="no-cars container">No cars found.</div>;
  }

  return (
    <div className="userCars">
      <h2>
        <span>My Cars:</span>
      </h2>
      <div className="carInfo container">
        <ul>
          {cars.map((car) => (
            <li key={car.id}>
              <h3>
                <span>{car.brand}</span> {car.model}
              </h3>
              <img src={porsche} alt="porsche" className="img" />

              <p>
                <span>Socket:</span> {car.socket}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

UserCars.propTypes = {
  cars: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      brand: propTypes.string.isRequired,
      model: propTypes.string.isRequired,
      socket: propTypes.string.isRequired,
    })
  ).isRequired,
};
