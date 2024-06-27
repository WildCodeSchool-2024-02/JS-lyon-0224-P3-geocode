import { ToastContainer } from "react-toastify";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./components/Navbar/NavBar";
import "./App.css";

function App() {
  const location = useLocation();

  const isLogoVisible =
    location.pathname !== "/profile" && location.pathname !== "/SignIn";

  return (
    <>
      <NavBar isLogoVisible={isLogoVisible} />
      <Outlet />
      <ToastContainer />
    </>
  );
}

export default App;
