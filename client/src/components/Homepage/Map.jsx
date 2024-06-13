import ReactDOMServer from "react-dom/server";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./Map.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import GeoSearch from "./geoSearch";

const createCustomIcon = () =>
  L.divIcon({
    className: "custom-div-icon",
    html: ReactDOMServer.renderToString(
      <FaMapMarkerAlt className="mapMarker" />
    ),
    iconAnchor: [12, 24],
  });

function Map() {
  return (
    <div className="map-component">
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
          <GeoSearch />
          <Marker position={[45.757198, 4.8312188]} icon={createCustomIcon()}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default Map;
