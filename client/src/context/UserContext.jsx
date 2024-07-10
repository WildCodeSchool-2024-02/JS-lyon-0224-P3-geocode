import PropTypes from "prop-types";
import { createContext, useContext, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
import useLocalStorage from "../utils/useLocalStorage";

const UserContext = createContext();

export function UserProvider({ children }) {
  // const ApiUrl = import.meta.env.VITE_API_URL;
  // const navigate = useNavigate();

  const [user, setUser] = useLocalStorage("user", null);

  const login = (userData) => {
    setUser(userData);
  };

  // const logout = async (sessionExpired) => {
  //   try {
  //     const response = await fetch(`${ApiUrl}/user/logout`, {
  //       credentials: "include", // envoyer / recevoir le cookie à chaque requête
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (response.status === 200) {
  //       setUser(null);
  //       navigate(sessionExpired === true ? "/connexion" : "/");
  //     }
  //   } catch (err) {
  //     // Log des erreurs possibles
  //     console.error(err);
  //   }
  // };

  const memo = useMemo(
    () => ({ user, setUser, login }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );

  return <UserContext.Provider value={memo}>{children}</UserContext.Provider>;
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useUserContext = () => useContext(UserContext);
