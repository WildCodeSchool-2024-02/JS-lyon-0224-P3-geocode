import "./StationInfo.css";
import PropTypes from "prop-types";
import stationPic from "../../assets/image/pngtree-white-electric-vehicle-charging-station-png-image_6574430 1.png";
import chargerPic from "../../assets/image/ev-plug-t2.svg";

function StationInfo({ station }) {
  const address = station !== null ? station.address : "";
  const power = station !== null ? station.power : "";
  const spots = station !== null ? station.spots : "";
  const type = station !== null ? station.type : "";

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
            {/* when we fetch our data here we going to make a logic to show info related to the map */}
            {/* here we will use the data for the station */}
            <h2>
              <span>{spots}</span>
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
            {/* here we will use the data for the address */}
            <h3>
              <span>Address</span>
            </h3>
            <p>{address}</p>
          </div>
          <div className="charger">
            {/* here we will use the data for the charger type and we are going to be mapping for the types maybe */}
            <img src={chargerPic} alt="charger type icon" />
            <h3>
              <span>{type}</span>
            </h3>
          </div>
          <div className="supplementary_buttons">
            <button type="button" className="button dire">
              <p>Direction</p>
            </button>
            <button type="button" className="button">
              <p>Reservation</p>
            </button>
          </div>
        </div>
      </div>
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
