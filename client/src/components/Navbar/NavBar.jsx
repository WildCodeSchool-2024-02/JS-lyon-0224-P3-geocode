import { MdElectricCar } from "react-icons/md";
import "./NavBar.css";

function NavBar() {
  return (
    <div className="navBar_component">
      <div className="menuBurger">
        <span />
        <span />
        {/* <span /> */}
      </div>
      <div className="logo">
        <MdElectricCar className="logo" />
      </div>
    </div>
  );
}

export default NavBar;
