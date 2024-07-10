import { ToastContainer } from "react-toastify";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./components/Navbar/NavBar";
import { UserProvider } from "./context/UserContext";
import "./App.css";

function App() {
  const location = useLocation();

  const isLogoVisible =
    location.pathname !== "/profile" && location.pathname !== "/SignIn";

  return (
    <UserProvider>
      <NavBar isLogoVisible={isLogoVisible} />
      <Outlet />
      <ToastContainer />
    </UserProvider>
  );
}

export default App;
