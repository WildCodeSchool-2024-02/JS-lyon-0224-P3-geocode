// HomePage.js
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import StationInfo from "../components/Homepage/StationInfo";
import Map from "../components/Homepage/Map";

export default function HomePage() {
  const stations = useLoaderData();
  const [selectedStation, setSelectedStation] = useState(null);

  return (
    <div className="home">
      <Map stations={stations} setSelectedStation={setSelectedStation} />
      <StationInfo station={selectedStation} />
    </div>
  );
}
