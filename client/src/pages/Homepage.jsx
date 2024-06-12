import { useState } from "react";
import StationInfo from "../components/Homepage/StationInfo";
import Map from "../components/Homepage/Map";

export default function Homepage() {
  const [selectedStation, setSelectedStation] = useState("");

  return (
    <>
      <Map setSelectedStation={setSelectedStation} />
      <StationInfo station={selectedStation} />
    </>
  );
}
