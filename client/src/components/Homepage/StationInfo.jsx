import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import stationPic from "../../assets/image/pngtree-white-electric-vehicle-charging-station-png-image_6574430 1.png";
import chargerPic from "../../assets/image/ev-plug-t2.svg";
import "../../Styles/StationInfo.css";

function StationInfo({ station }) {
  const address = station?.address || "";
  const power = station?.power || "";
  const spot = station?.spots || "";
  const type = station?.type || "";
  const isSelected = station !== null;

  const navigate = useNavigate();

  const { user } = useUserContext();

  const handleReservation = () => {
    if (isSelected) {
      navigate(`/rent/${station.id}`);
    }
  };

  const getTitle = () => {
    if (user === "null") {
      return "Please connect";
    }
    if (!isSelected) {
      return "Please choose a station";
    }
    return "";
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
              className={`button  ${user === "null" ? "disabled_button" : "button"}`}
              disabled={user === "null" || !isSelected}
              title={getTitle()}
            >
              Direction
            </button>
            <button
              type="button"
              className={`button  ${user === "null" ? "disabled_button" : "button"}`}
              onClick={handleReservation}
              disabled={user === "null" || !isSelected}
              title={getTitle()}
            >
              Reservation
            </button>
          </div>
        </div>
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
