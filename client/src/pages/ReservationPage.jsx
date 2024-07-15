import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ReservationForm from "../components/reservation/ReservationForm";
import { useUserContext } from "../context/UserContext";

function ReservationPage() {
  const { stationId } = useParams();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (user === null) {
      navigate("/signin");
    }
  }, [user, navigate]);

  const userId = user.id;

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
