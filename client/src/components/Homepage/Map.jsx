import { useLoaderData } from "react-router-dom";
import ReactDOMServer from "react-dom/server";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "./Map.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import PropTypes from "prop-types";

const createCustomIcon = () =>
  L.divIcon({
    className: "custom-div-icon",
    html: ReactDOMServer.renderToString(
      <FaMapMarkerAlt className="mapMarker" />
    ),
    iconAnchor: [12, 24],
  });

function Map({ setSelectedStation }) {
  const stations = useLoaderData();

  const handleStationClick = (station) => {
    setSelectedStation(station);
  };

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
        <MapContainer
          center={[45.75, 4.83]}
          zoom={13}
          scrollWheelZoom
          className="map"
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          {stations.map((station) => (
            <Marker
              key={station.id}
              position={[station.geo_y, station.geo_x]}
              icon={createCustomIcon()}
              eventHandlers={{
                click: () => handleStationClick(station),
              }}
            />
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

Map.propTypes = {
  setSelectedStation: PropTypes.func.isRequired,
};

export default Map;
