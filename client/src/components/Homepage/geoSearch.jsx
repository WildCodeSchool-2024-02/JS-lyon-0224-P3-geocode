import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";

function GeoSearch() {
  const map = useMap();

  useEffect(() => {
    // Create a new OpenStreetMap provider with country codes set to "fr" (France)
    const provider = new OpenStreetMapProvider({
      params: {
        countrycodes: "fr",
      },
    });

    // Create a new GeoSearchControl with specified options and connect it to the map
    const searchControl = new GeoSearchControl({
      provider,
      showMarker: true,
      showPopup: false,
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true,
      keepResult: true,
      style: "bar",
    });
    map.addControl(searchControl);

    // Remove the GeoSearchControl from the map when the component is unmounted
    return () => {
      map.removeControl(searchControl);
    };
  }, [map]);

  // Return null because this component does not render anything
  return null;
}

export default GeoSearch;
