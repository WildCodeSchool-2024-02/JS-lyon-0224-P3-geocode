import { useState, useEffect } from "react";
import PropTypes from "prop-types";

// The DateTimePicker component allows users to pick a date and time for a reservation.
// It restricts the selection within a minimum and maximum range.
function DateTimePicker({ reservationTime, setReservationTime }) {
  // State variables to store the minimum and maximum datetime limits.
  const [minDateTime, setMinDateTime] = useState("");
  const [maxDateTime, setMaxDateTime] = useState("");

  // useEffect hook to update the datetime limits whenever the reservationTime changes.
  useEffect(() => {
    const updateDateTimeLimits = () => {
      const currentDateTime = new Date();

      // Adjust current date and time for the local time zone offset.
      const timezoneOffset = currentDateTime.getTimezoneOffset() * 60000;
      const localDateTime = new Date(
        currentDateTime.getTime() - timezoneOffset
      );

      // Convert the reservationTime to a Date object, if provided.
      const selectedDateTime = reservationTime
        ? new Date(reservationTime)
        : null;

      // Determine if the selected date is today.
      const isToday = selectedDateTime
        ? localDateTime.toDateString() === selectedDateTime.toDateString()
        : false;

      // Set the minimum time to the current local datetime.
      const minTime = isToday
        ? localDateTime.toISOString().slice(0, 16)
        : localDateTime.toISOString().slice(0, 16);

      // Set the maximum time to 48 hours from the current local datetime.
      const maxTime = new Date(localDateTime.getTime() + 48 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 16);

      // Update the state variables with the new datetime limits.
      setMinDateTime(minTime);
      setMaxDateTime(maxTime);
    };

    // Call the function to set the initial limits.
    updateDateTimeLimits();
  }, [reservationTime]); // Dependency array ensures the effect runs when reservationTime changes.

  return (
    <label>
      <p>Reservation Time:</p>
      <input
        className="reservation container"
        type="datetime-local"
        value={reservationTime} // Controlled input linked to reservationTime state.
        onChange={(e) => setReservationTime(e.target.value)} // Update the reservationTime state when the user changes the input.
        required
        min={minDateTime} // The earliest selectable date and time, adjusted to the local time zone.
        max={maxDateTime} // The latest selectable date and time, set to 24 hours from now.
      />
    </label>
  );
}

DateTimePicker.propTypes = {
  reservationTime: PropTypes.string.isRequired,
  setReservationTime: PropTypes.func.isRequired,
};

export default DateTimePicker;
