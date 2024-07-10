import { useParams } from "react-router-dom";
import ReservationForm from "../components/reservation/ReservationForm";

function ReservationPage() {
  const { stationId } = useParams();
  const userId = 1; // Example userId, replace with actual userId from context/auth

  return (
    <div className="reservationPage">
      <div className="pageContent">
        <h2>
          <span>Reserve a Spot</span>
        </h2>
        <ReservationForm stationId={Number(stationId)} userId={userId} />
      </div>
    </div>
  );
}

export default ReservationPage;
