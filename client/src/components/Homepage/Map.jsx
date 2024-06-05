import "./Map.css";

function Map() {
  return (
    <div className="map-component">
      <div className="search-container">
        <input
          className="input container"
          type="search"
          placeholder="Search a city ..."
        />
      </div>
      <div className="map container">
        <h2>MAP</h2>
      </div>
    </div>
  );
}

export default Map;
