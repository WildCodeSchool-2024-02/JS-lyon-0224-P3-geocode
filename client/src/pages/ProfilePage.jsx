import UserInfo from "../components/Profile/UserInfo";
import UserCars from "../components/Profile/UserCars";

export default function ProfilPage() {
  return (
    <div className="profile-component">
      <UserInfo />
      <UserCars />
    </div>
  );
}
