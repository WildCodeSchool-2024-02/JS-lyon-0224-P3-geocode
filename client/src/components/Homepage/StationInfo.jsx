import { useState, useEffect, useRef } from "react";
import "./StationInfo.css";
import PropTypes from "prop-types";
import stationPic from "../../assets/image/pngtree-white-electric-vehicle-charging-station-png-image_6574430 1.png";
import chargerPic from "../../assets/image/ev-plug-t2.svg";
import ReservationPopUp from "./ReservationPopUp";

function StationInfo({ station }) {
  const address = station !== null ? station.address : "";
  const power = station !== null ? station.power : "";
  const type = station !== null ? station.type : "";

  // State to manage the available spots
  const [availableSpots, setAvailableSpots] = useState(
    station ? station.spots : 0
  );
  const [showPopup, setShowPopup] = useState(false);
  const timeoutRef = useRef(null);

  // Update available spots when station data changes
  useEffect(() => {
    if (station) {
      setAvailableSpots(station.spots);
    }
  }, [station]);

  useEffect(
    () => () => {
      // Clear any pending timeouts when the component unmounts or station changes
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    },
    [station]
  );

  // Handler for the reservation button
  const handleReservation = () => {
    setShowPopup(true);
  };

  const handleReserved = () => {
    setAvailableSpots((prev) => prev - 1);
    setShowPopup(false);

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a new timeout to restore the spot after 30 minutes
    timeoutRef.current = setTimeout(
      () => {
        setAvailableSpots((prev) => prev + 1);
      },
      30 * 60 * 1000
    ); // 30 minutes in milliseconds
  };

  return (
    <div className="stationComponent">
      <div className="stationInfo container">
        <div className="station">
          <div>
            <img
              src={stationPic}
              alt="white-electric-vehicle-charging-station"
            />
          </div>
          <div className="info">
            <h2>
              <span>{availableSpots}</span>
            </h2>
            <p>Spots</p>
            <h2>
              <span>{power}</span>
            </h2>
            <p>kw/h</p>
          </div>
        </div>
        <div className="supplementary">
          <div className="address">
            <h3>
              <span>Address</span>
            </h3>
            <p>{address}</p>
          </div>
          <div className="charger">
            <img src={chargerPic} alt="charger type icon" />
            <h3>
              <span>{type}</span>
            </h3>
          </div>
          <div className="supplementary_buttons">
            <button type="button" className="button dire">
              <h3>Direction</h3>
            </button>
            <button
              type="button"
              className="button"
              onClick={handleReservation}
              disabled={availableSpots === 0}
            >
              <h3>Reservation</h3>
            </button>
          </div>
        </div>
      </div>
      {showPopup && (
        <ReservationPopUp
          station={station}
          onClose={() => setShowPopup(false)}
          onReserved={handleReserved}
        />
      )}
    </div>
  );
}

StationInfo.propTypes = {
  station: PropTypes.shape({
    id: PropTypes.number.isRequired,
    address: PropTypes.string,
    power: PropTypes.number,
    spots: PropTypes.number,
    type: PropTypes.string,
  }),
};

StationInfo.defaultProps = {
  station: null,
};

export default StationInfo;
