import "./App.css";
import { Outlet } from "react-router-dom";
import NavBar from "./components/Navbar/NavBar";
import { LogoProvider } from "./components/Context/LogoContext";

function App() {
  return (
    <LogoProvider>
      <NavBar />
      <Outlet />
    </LogoProvider>
  );
}

export default App;
