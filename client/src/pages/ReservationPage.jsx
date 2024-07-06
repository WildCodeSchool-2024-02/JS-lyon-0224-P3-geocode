import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import handleRent from "../utils/HandleRent";

function ReservationPage() {
  const { stationId } = useParams();
  const userId = 1; // Example userId, replace with actual userId from context/auth
  const navigate = useNavigate();

  const [reservationTime, setReservationTime] = useState("");
  const [duration, setDuration] = useState(30);
  const [endTime, setEndTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

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
      setEndTime(endTimeCalculated);
      navigate("/"); // Redirect to homepage or another page after reservation
    } else {
      console.error("Reservation failed:", result.error);
    }
  };

  useEffect(() => {
    if (!endTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const distance = new Date(endTime) - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
      } else {
        setTimeLeft(distance);
      }
    }, 1000);

    // eslint-disable-next-line consistent-return
    return () => {
      clearInterval(interval);
    };
  }, [endTime]);

  return (
    <div className="reservationPage">
      <div className="pageContent">
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
          <button
            type="button"
            className="button"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </form>
        {endTime && <div>Time left: {Math.floor(timeLeft / 1000)} seconds</div>}
      </div>
    </div>
  );
}

export default ReservationPage;
