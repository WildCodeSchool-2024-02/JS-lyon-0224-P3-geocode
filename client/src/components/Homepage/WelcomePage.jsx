// WelcomePage.jsx
import { useEffect } from "react";
import PropTypes from "prop-types";
import "./WelcomePage.css";

function WelcomePage({ onTimeout }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onTimeout();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onTimeout]);

  return (
    <div className="welcome">
      <h1>Welcome</h1>
    </div>
  );
}

WelcomePage.propTypes = {
  onTimeout: PropTypes.func.isRequired,
};

export default WelcomePage;
