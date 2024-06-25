import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./components/Navbar/NavBar";

function App() {
  const location = useLocation();

  const isLogoVisible = location.pathname !== "/profile";

  return (
    <>
      <NavBar isLogoVisible={isLogoVisible} />
      <Outlet />
    </>
  );
}

export default App;
