import PropTypes from "prop-types";
import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import UseLocalStorage from "../hooks/UseLocalStorage";
import { signOutUser } from "../API/HandleProfile";

const UserContext = createContext();

export function UserProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = UseLocalStorage("user", null);

  const login = (userData) => {
    setUser(userData);
  };

  const signout = async (sessionExpired) => {
    try {
      await signOutUser();
      setUser(null);
      if (sessionExpired === true) {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const memo = useMemo(
    () => ({ user, setUser, login, signout }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );

  return <UserContext.Provider value={memo}>{children}</UserContext.Provider>;
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useUserContext = () => useContext(UserContext);
