import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UserInfo from "../components/Profile/UserInfo";
import UserCars from "../components/Profile/UserCars";
import { loadUserData } from "../API/HandleProfile";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        setUser(await loadUserData());
      } catch (error) {
        console.error(error, "redirection");
        navigate("/profileAccess");
      }
    };
    getUser();
  }, [navigate]);

  return (
    <div>
      {user !== null ? (
        <div className="profile-component">
          <UserInfo user={user} />
          <UserCars cars={user.cars} />
        </div>
      ) : (
        "profile page is missing"
      )}
    </div>
  );
}
