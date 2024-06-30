import { useState } from "react";
import "./StationInfo.css";
import PropTypes from "prop-types";
import stationPic from "../../assets/image/pngtree-white-electric-vehicle-charging-station-png-image_6574430 1.png";
import chargerPic from "../../assets/image/ev-plug-t2.svg";
import ReservationPopUp from "./ReservationPopUp";

function StationInfo({ station }) {
  const address = station !== null ? station.address : "";
  const power = station !== null ? station.power : "";
  const initialSpots = station !== null ? station.spots : 0;
  const type = station !== null ? station.type : "";

  // State to manage the available spots
  const [availableSpots, setAvailableSpots] = useState(initialSpots);
  // State to manage the popup visibility
  const [showPopup, setShowPopup] = useState(false);

  // Handler for the reservation button
  const handleReservation = () => {
    setShowPopup(true);
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
          onReserved={() => {
            setAvailableSpots(availableSpots - 1);
            setShowPopup(false);
          }}
        />
      )}
    </div>
  );
}

StationInfo.propTypes = {
  station: PropTypes.shape({
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
