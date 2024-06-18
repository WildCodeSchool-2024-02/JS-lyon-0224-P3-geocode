import UserInfo from "../components/Profile/UserInfo";
import UserCars from "../components/Profile/UserCars";

export default function Profilpage() {
  return (
    <div className="profile-component">
      <UserInfo />
      <UserCars />
    </div>
  );
}
