import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserInfo from "../components/Profile/UserInfo";
import UserCars from "../components/Profile/UserCars";
import fetchWithAuth from "../utils/fetchWithAuth";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const Api = import.meta.env.VITE_API_URL;
  const { id } = useParams();

  const getProfile = async () => {
    try {
      const response = await fetchWithAuth(`${Api}/api/users/${id}`);
      if (response.status !== 200) {
        throw new Error("Failed to fetch profile data");
      }
      const data = await response.json();
      setUser(data); // Ensure we are setting the correct user data
    } catch (errorMessage) {
      console.error("Error fetching profile data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, [id]);

  useEffect(() => {}, [user]);

  if (loading) {
    return <div className="ProfileInfo">Loading...</div>;
  }

  if (error) {
    return <div className="ProfileInfo">Error: {error}</div>;
  }

  if (!user) {
    return <div className="ProfileInfo">User profile not found.</div>;
  }

  return (
    <div className="profile-component">
      <UserInfo user={user} />
      {user.cars && user.cars.length > 0 ? (
        <UserCars cars={user.cars} />
      ) : (
        <div>No cars found.</div>
      )}
    </div>
  );
}
