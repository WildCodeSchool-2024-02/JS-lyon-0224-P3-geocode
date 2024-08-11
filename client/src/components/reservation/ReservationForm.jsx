import { useState, useEffect } from "react";
import { useNavigate, Form } from "react-router-dom";
import PropTypes from "prop-types";
import handleRent from "../../API/HandleRent";
import { loadUserData } from "../../API/HandleProfile";
import handleCheckRent from "../../API/HandleCheckRent";
import notify from "../../poptoastify/notify";
import DateTimePicker from "./DateTimePicker";

function ReservationForm({ stationId, userId }) {
  const navigate = useNavigate();
  const [reservationTime, setReservationTime] = useState("");
  const [duration, setDuration] = useState(30);
  const [cars, setCars] = useState([]);
  const [selectedCarId, setSelectedCarId] = useState("");
  const [time, setTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    const fetchUserCars = async () => {
      try {
        const userData = await loadUserData();
        if (userData.cars.length > 0) {
          setCars(userData.cars);
          setSelectedCarId(userData.cars[0].id);
        } else {
          notify("No cars available for reservation.", "info");
        }
      } catch (error) {
        console.error("Failed to load user cars:", error);
        notify("Failed to load user cars.", "error");
      }
    };

    fetchUserCars();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const lastReservation = await handleCheckRent(userId);
      if (lastReservation) {
        const currentTime = new Date();
        const lastReservationEndTime = new Date(lastReservation.end_time);

        if (currentTime < lastReservationEndTime) {
          const formattedEndTime = lastReservationEndTime.toLocaleString();
          notify(
            `You already have an ongoing reservation! You can rent again after ${formattedEndTime}.`,
            "error"
          );
          return;
        }
      }

      const startTime = new Date(reservationTime);
      const endTimeCalculated = new Date(
        startTime.getTime() + duration * 60000
      );

      const reservationDetails = {
        stationId,
        userId,
        carId: selectedCarId,
        startTime: startTime.toISOString(),
        endTime: endTimeCalculated.toISOString(),
      };

      const result = await handleRent(reservationDetails);
      if (result.success) {
        setTime(startTime);
        setEndTime(endTimeCalculated);
        notify("Reservation created!", "success");
        setTimeout(() => {
          navigate("/");
        }, 5000);
      } else {
        console.error("Reservation failed:", result.error);
        notify("Reservation failed. Please try again.", "error");
      }
    } catch (error) {
      console.error("Failed to create reservation:", error);
      notify("Failed to create reservation. Please try again.", "error");
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} method="post" className="reservation-form">
        <DateTimePicker
          reservationTime={reservationTime}
          setReservationTime={setReservationTime}
        />
        <label>
          <p>Duration:</p>
          <select
            className="reservation container"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value, 10))}
          >
            <option value={30}>30 minutes</option>
            <option value={60}>1 hour</option>
            <option value={90}>1 hour 30 minutes</option>
            <option value={120}>2 hours</option>
          </select>
        </label>
        <label>
          <p>Select Car:</p>
          <select
            value={selectedCarId}
            onChange={(e) => setSelectedCarId(e.target.value)}
            required
            className="reservation container"
          >
            {cars.map((car) => (
              <option key={car.id} value={car.id}>
                {car.make} {car.model}
              </option>
            ))}
          </select>
        </label>
        <div className="reservationBtn">
          <button type="submit" className="button">
            Reserve
          </button>
          <button
            type="button"
            className="deletebtn"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </Form>
      {time && endTime && (
        <div className="rent-confirmation">
          <h3>
            <span>Reservation Confirmed</span>
          </h3>
          <p>Start Time: {time.toLocaleString()}</p>
          <p>End Time: {endTime.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

ReservationForm.propTypes = {
  stationId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
};

export default ReservationForm;
