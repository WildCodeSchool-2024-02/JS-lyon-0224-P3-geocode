import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import stationPic from "../../assets/image/charging-station.png";
import chargerPic from "../../assets/image/plug1.png";
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
              {spot}
            </h2>
            <p><span>Spots</span></p>
            <h2>
              {power}
            </h2>
            <p><span>Power kw/h</span></p>
          </div>
        </div>
        <div className="supplementary">
          <div className="address">
            <p>
              <span>Address</span>
            </p>
            <p>{address}</p>
          </div>
          <div className="charger">
            <div className="img-component">
              <img src={chargerPic} alt="charger type icon" />
              <p>
                <span>Type</span>
              </p>
            </div>
            <p>{type}</p>
          </div>
          <div className="supplementary_buttons">
            {/* <button
              type="button"
              className={`button  ${user === "null" ? "disabled_button" : "button"}`}
              disabled={user === "null" || !isSelected}
              title={getTitle()}
            >
              Direction
            </button> */}
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
