import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import ReservationForm from "../reservation/ReservationForm";
import "./StationInfo.css";
import stationPic from "../../assets/image/pngtree-white-electric-vehicle-charging-station-png-image_6574430 1.png";
import chargerPic from "../../assets/image/ev-plug-t2.svg";

function StationInfo({ station }) {
  const address = station?.address || "";
  const power = station?.power || "";
  const spot = station?.spots || "";
  const type = station?.type || "";
  const isSelected = station !== null;

  const navigate = useNavigate();

  const handleReservation = () => {
    if (isSelected) {
      navigate(`/rent/${station.id}`);
    }
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
              <span>{spot}</span>
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
            <button
              type="button"
              className="button dire"
              disabled={!isSelected}
            >
              <h3>Direction</h3>
            </button>
            <button
              type="button"
              className="button"
              onClick={handleReservation}
              disabled={!isSelected}
            >
              <h3>Reservation</h3>
            </button>
          </div>
        </div>
        {isSelected && <ReservationForm stationId={station.id} userId={1} />}
      </div>
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
