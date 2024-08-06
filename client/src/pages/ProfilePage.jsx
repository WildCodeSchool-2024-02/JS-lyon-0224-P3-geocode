import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import UserInfo from "../components/Profile/UserInfo";
import UserCars from "../components/Profile/UserCars";
import AddCarPopUp from "../components/Profile/addCarPopUp";
import { loadUserData } from "../API/HandleProfile";
import addCar from "../API/HandleAddCar";

/**
 * ProfilePage component displays user profile information and allows users to add new cars.
 * It fetches user data using the `loadUserData` function and displays it using the `UserInfo` and `UserCars` components.
 * It also provides a button to add new cars, which triggers the `AddCarPopUp` component.
 * If the user is not logged in or the data fetch fails, it displays "profile page is missing".
 */
export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [showAddCarPopup, setShowAddCarPopup] = useState(false);
  const navigate = useNavigate();

  /**
   * Fetches user data and sets the state.
   * If fetching fails, redirects to the profile access page.
   * Wrapped in `useCallback` to prevent unnecessary re-renders.
   */
  const getUser = useCallback(async () => {
    try {
      setUser(await loadUserData());
    } catch (error) {
      console.error(error, "redirection");
      navigate("/profileAccess");
    }
  }, [navigate]);

  // Fetch user data when the component mounts
  useEffect(() => {
    getUser();
  }, [getUser]);

  /**
   * Handles the submission of new car data.
   * Calls the `addCar` function with the new car data and user ID.
   * If the request is successful, fetches the updated user data.
   * Memoized with `getUser` and `user` as dependencies.
   */
  const handleAddCar = useCallback(
    async (car) => {
      const response = await addCar(car, user?.id);
      if (response.success) {
        getUser();
      }
    },
    [getUser, user]
  );

  return (
    <div>
      {user !== null ? (
        <div className="profile-component">
          <UserInfo user={user} />
          <UserCars cars={user.cars} />
          <div className="button-container">
            <button
              type="button"
              onClick={() => setShowAddCarPopup(true)}
              className="add_button"
            >
              Add Car
            </button>
          </div>

          {showAddCarPopup && (
            <AddCarPopUp
              onClose={() => setShowAddCarPopup(false)}
              onSubmit={handleAddCar}
            />
          )}
        </div>
      ) : (
        "profile page is missing"
      )}
    </div>
  );
}
