import { useLoaderData } from "react-router-dom";
import ReactDOMServer from "react-dom/server";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState, useEffect, useCallback } from "react";
import L from "leaflet";
import "../../Styles/Map.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import PropTypes from "prop-types";
import GeoSearch from "./geoSearch";

// Function to create custom marker icon using React Icons and Leaflet
const createCustomIcon = () =>
  L.divIcon({
    className: "custom-div-icon",
    html: ReactDOMServer.renderToString(
      <FaMapMarkerAlt className="mapMarker" />
    ),
  });

function Map({ setSelectedStation }) {
  // Load stations data using custom hook from react-router-dom
  const stations = useLoaderData();
  // State to hold currently visible markers on the map
  const [currentMarkers, setCurrentMarkers] = useState([]);
  // State to track the current center and zoom level of the map
  const [mapRegion, setMapRegion] = useState({
    center: [45.75, 4.83], // Default center coordinates
    zoom: 13, // Default zoom level
  });
  const MAX_MARKERS = 100; // Maximum number of markers to display
  const RANGE_INCREASE = 0.3; // Increase the range by 0.2 degrees

  // Function to filter markers based on the visible bounds of the map
  const filterMarkersByBounds = useCallback(
    (bounds) => {
      const { _southWest, _northEast } = bounds;
      // Filter stations within the current map bounds
      const newMarkers = stations
        .filter((station) => {
          const lat = station.geo_y;
          const lng = station.geo_x;
          return (
            lat >= _southWest.lat &&
            lat <= _northEast.lat &&
            lng >= _southWest.lng &&
            lng <= _northEast.lng
          );
        })
        .slice(0, MAX_MARKERS); // Limit to MAX_MARKERS
      setCurrentMarkers(newMarkers); // Update current markers state
    },
    [stations]
  );

  // Effect to filter markers initially and whenever mapRegion or stations change
  useEffect(() => {
    // Initial filtering with increased range around the center
    const mapBounds = L.latLngBounds(
      [
        mapRegion.center[0] - RANGE_INCREASE,
        mapRegion.center[1] - RANGE_INCREASE,
      ],
      [
        mapRegion.center[0] + RANGE_INCREASE,
        mapRegion.center[1] + RANGE_INCREASE,
      ]
    );
    filterMarkersByBounds(mapBounds); // Filter markers based on initial bounds
  }, [stations, mapRegion, filterMarkersByBounds]);

  // Function to handle click events on markers
  const handleStationClick = (station) => {
    setSelectedStation(station); // Call setSelectedStation prop with clicked station
  };

  // Component to handle map events, such as moveend (when the map view changes)
  function MapEvents() {
    const map = useMapEvents({
      moveend: () => {
        const newBounds = map.getBounds(); // Get the current visible bounds of the map
        // Increase the bounds to ensure markers are fetched from a slightly larger area
        const increasedBounds = newBounds.pad(RANGE_INCREASE / 0.1);
        // Update mapRegion state with the new center and zoom level
        setMapRegion({
          center: [map.getCenter().lat, map.getCenter().lng],
          zoom: map.getZoom(),
        });
        filterMarkersByBounds(increasedBounds); // Filter markers based on the new bounds
      },
    });
    return null;
  }

  return (
    <div className="map-component">
      <div className="map container">
        <MapContainer
          center={mapRegion.center}
          zoom={mapRegion.zoom}
          scrollWheelZoom // Enable scroll wheel zoom
          className="map"
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          <GeoSearch />
          <MapEvents />
          {currentMarkers.map((station) => (
            <Marker
              key={station.id}
              position={[station.geo_y, station.geo_x]} // Marker position based on station coordinates
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
