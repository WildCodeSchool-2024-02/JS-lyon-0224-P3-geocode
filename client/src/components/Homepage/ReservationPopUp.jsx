import { useState } from "react";
import PropTypes from "prop-types";
import "./ReservationPopup.css";

function ReservationPopUp({ station, onClose, onReserved }) {
  const [reservationTime, setReservationTime] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const reservationDetails = {
      stationId: station.id,
      userId: 1, // Replace with actual user ID
      carId: 1,
      reservationTime,
      duration: 30,
    };

    try {
      const response = await fetch("/api/stations/rent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationDetails),
      });

      if (response.status === 201) {
        onReserved();
      } else {
        console.error("Reservation failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="reservationPopup">
      <div className="popupContent">
        <h2>
          <span>Reserve a Spot</span>
        </h2>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Reservation Time:</p>
            <input
              type="datetime-local"
              value={reservationTime}
              onChange={(e) => setReservationTime(e.target.value)}
              required
            />
          </label>
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
  station: PropTypes.shape.isRequired,
  onClose: PropTypes.func.isRequired,
  onReserved: PropTypes.func.isRequired,
};

export default ReservationPopUp;
