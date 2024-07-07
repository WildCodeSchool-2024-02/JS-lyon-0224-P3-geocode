import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import handleRent from "../../utils/HandleRent";

function ReservationForm({ stationId, userId }) {
  const navigate = useNavigate();
  const [reservationTime, setReservationTime] = useState("");
  const [duration, setDuration] = useState(30);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const startTime = new Date(reservationTime);
    const endTimeCalculated = new Date(startTime.getTime() + duration * 60000);

    const reservationDetails = {
      stationId,
      userId,
      carId: 1, // Replace with actual carId
      startTime: startTime.toISOString(),
      endTime: endTimeCalculated.toISOString(),
    };

    const result = await handleRent(reservationDetails);
    if (result.success) {
      navigate("/"); // Redirect to homepage or another page after reservation
    } else {
      console.error("Reservation failed:", result.error);
    }
  };

  return (
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
      <label>
        <p>Duration:</p>
        <select
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value, 10))}
        >
          <option value={30}>30 minutes</option>
          <option value={60}>1 hour</option>
          <option value={90}>1 hour 30 minutes</option>
          <option value={120}>2 hours</option>
        </select>
      </label>
      <button type="submit" className="button">
        Reserve
      </button>
      <button type="button" className="button" onClick={() => navigate("/")}>
        Cancel
      </button>
    </form>
  );
}

ReservationForm.propTypes = {
  stationId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
};

export default ReservationForm;
