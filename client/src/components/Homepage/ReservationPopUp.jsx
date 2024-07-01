import { useState } from "react";
import PropTypes from "prop-types";
import "./ReservationPopup.css";

function ReservationPopUp({ station, onClose, onReserved }) {
  const [userId, setUserId] = useState("");
  const [carId, setCarId] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const now = new Date();
    const reservationDetails = {
      stationId: station.id,
      userId,
      carId,
      reservationTime: now.toISOString(),
      duration: 30,
    };

    console.info("Reservation details:", reservationDetails);
    onReserved();
  };

  return (
    <div className="reservationPopup">
      <div className="popupContent">
        <h2>
          <span>Reserve a Spot</span>
        </h2>
        <form onSubmit={handleSubmit}>
          <label>
            <p>User ID:</p>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </label>
          <label>
            <p>Car ID:</p>
            <input
              type="text"
              value={carId}
              onChange={(e) => setCarId(e.target.value)}
              required
            />
          </label>
          <p>This spot will be reserved for the next 30 minutes.</p>
          <button type="submit" className="button">
            Reserve
          </button>
          <button type="button" className="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

ReservationPopUp.propTypes = {
  station: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onReserved: PropTypes.func.isRequired,
};

export default ReservationPopUp;
