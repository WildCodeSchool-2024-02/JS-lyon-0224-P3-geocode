import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function StationTable ({ Station }) {
  const [stationData, setStationData] = useState([]);

  // Use useEffect to limit the number of stations to 50
  useEffect(() => {
    if (Station.length > 0) {
      setStationData(Station.slice(0, 50).map(station => ({
        ...station,
        geoX: station.geo_x,
        geoY: station.geo_y
      }))); // Limit to the first 50 stations and map geo_x and geo_y to camel case
    }
  }, [Station]);

  const onChangeInput = (e, stationId) => {
    const { name, value } = e.target;

    // Create a new array with updated stationData
    const updatedStationData = stationData.map((item) =>
      item.id === stationId ? { ...item, [name]: value } : item
    );

    setStationData(updatedStationData); // Update state with the new array
  };

  return (
    <div className="container">
      <h1 className="title">Station Table</h1>
      <table>
        <thead>
          <tr>
            <th>Address</th>
            <th>geoX</th>
            <th>geoY</th>
            <th>Power</th>
            <th>Spots</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {stationData.map(
            ({ id, address, geoX, geoY, power, spots, type }) => (
              <tr key={id}>
                <td>
                  <label htmlFor={`address-${id}`}>Address</label>
                  <input
                    id={`address-${id}`}
                    name="address"
                    value={address}
                    type="text"
                    onChange={(e) => onChangeInput(e, id)}
                    placeholder="Type Address"
                  />
                </td>
                <td>
                  <label htmlFor={`geoX-${id}`}>geoX</label>
                  <input
                    id={`geoX-${id}`}
                    name="geoX"
                    value={geoX}
                    type="text"
                    onChange={(e) => onChangeInput(e, id)}
                    placeholder="Type GeoX"
                  />
                </td>
                <td>
                  <label htmlFor={`geoY-${id}`}>geoY</label>
                  <input
                    id={`geoY-${id}`}
                    name="geoY"
                    value={geoY}
                    type="text"
                    onChange={(e) => onChangeInput(e, id)}
                    placeholder="Type GeoY"
                  />
                </td>
                <td>
                  <label htmlFor={`power-${id}`}>Power</label>
                  <input
                    id={`power-${id}`}
                    name="power"
                    value={power}
                    type="text"
                    onChange={(e) => onChangeInput(e, id)}
                    placeholder="Type Power"
                  />
                </td>
                <td>
                  <label htmlFor={`spots-${id}`}>Spots</label>
                  <input
                    id={`spots-${id}`}
                    name="spots"
                    value={spots}
                    type="text"
                    onChange={(e) => onChangeInput(e, id)}
                    placeholder="Type Spots"
                  />
                </td>
                <td>
                  <label htmlFor={`type-${id}`}>Type</label>
                  <input
                    id={`type-${id}`}
                    name="type"
                    value={type}
                    type="text"
                    onChange={(e) => onChangeInput(e, id)}
                    placeholder="Type Type"
                  />
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

StationTable.propTypes = {
  Station: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      address: PropTypes.string,
      power: PropTypes.number,
      geo_x: PropTypes.number, // Original prop from API
      geo_y: PropTypes.number, // Original prop from API
      spots: PropTypes.number,
      type: PropTypes.string,
    })
  ).isRequired,
};

export default StationTable;
