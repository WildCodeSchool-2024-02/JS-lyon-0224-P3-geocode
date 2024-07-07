import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function Timer({ endTime }) {
  const [timeLeft, setTimeLeft] = useState(null);

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

  if (timeLeft === null) return null;

  return <div>Time left: {Math.floor(timeLeft / 1000)} seconds</div>;
}

Timer.propTypes = {
  endTime: PropTypes.string.isRequired,
};

export default Timer;
