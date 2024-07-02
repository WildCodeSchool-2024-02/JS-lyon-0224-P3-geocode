import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserInfo from "../components/Profile/UserInfo";
import UserCars from "../components/Profile/UserCars";

export default function ProfilePage() {
  // const user = useLoaderData();
  const [user, setUser] = useState(null);
  const Api = import.meta.env.VITE_API_URL;
  const { id } = useParams();

  const getProfile = async () => {
    try {
      const response = await fetch(`${Api}/api/users/${id}`);
      if (response.status !== 200) {
        throw new Error("Failed to fetch profile data");
      }
      const data = await response.json();
      setUser(data.user);
      return user;
    } catch (error) {
      // Log the error for debugging purposes
      console.error("Error fetching profile data:", error);
      // Rethrow the error to be handled by the caller
      throw error;
    }
  };

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (user === null) {
    return <div className="ProfileInfo">User profile not found.</div>;
  }

  return (
    <div className="profile-component">
      <UserInfo user={user} />
      <UserCars cars={user.cars} />
    </div>
  );
}
