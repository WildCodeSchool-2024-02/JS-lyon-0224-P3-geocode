import { useLoaderData } from "react-router-dom";
import UserInfo from "../components/Profile/UserInfo";
import UserCars from "../components/Profile/UserCars";

export default function ProfilePage() {
  const user = useLoaderData();
  if (user === null) {
    return <div className="ProfileInfo">User profile not found.</div>;
  }

  return (
    <div className="profileComponent">
      <UserInfo user={user} />
      <UserCars cars={user.cars} />
    </div>
  );
}
