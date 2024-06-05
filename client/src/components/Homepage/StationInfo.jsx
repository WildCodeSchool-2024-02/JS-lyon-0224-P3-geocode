import "./StationInfo.css";

function StationInfo() {
  return (
    <div className="stationComponent">
      <div className="stationInfo container">
        <div className="station">
          <h3>StationInfo</h3>
        </div>
        <div className="supplementary">
          <div className="address">
            <h3>Address</h3>
          </div>
          <div className="charger">
            <h3>Charger</h3>
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
