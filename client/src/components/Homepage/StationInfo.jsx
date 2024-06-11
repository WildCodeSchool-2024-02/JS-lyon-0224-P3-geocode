import "./StationInfo.css";
import stationPic from "../../assets/image/pngtree-white-electric-vehicle-charging-station-png-image_6574430 1.png";
import chargerPic from "../../assets/image/ev-plug-t2.svg";

function StationInfo() {
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
              <span>12</span>
            </h2>
            <h3>spots</h3>
            <h2>
              <span>200</span>
            </h2>
            <h3>kw/h</h3>
          </div>
        </div>
        <div className="supplementary">
          <div className="address">
            {/* here we will use the data for the address */}
            <h3>Address</h3>
            <h4>City</h4>
          </div>
          <div className="charger">
            {/* here we will use the data for the charger type and we are going to be mapping for the types maybe */}
            <img src={chargerPic} alt="ev-plug-t2" />
            <h3>type</h3>
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

export default StationInfo;
