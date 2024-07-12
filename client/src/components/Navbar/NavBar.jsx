import { useState } from "react";
import PropTypes from "prop-types";
import { useUserContext } from "../../context/UserContext";
import "../../Styles/NavBar.css";
import Logo from "../../assets/image/geocode4.svg";

function NavBar({ isLogoVisible }) {
  // State for burger menu classes
  const [burgerClass, setBurgerClass] = useState("burger-bar unclicked");
  const [menuClass, setMenuClass] = useState("menu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  const { user } = useUserContext();

  // Function to toggle menu visibility
  const updateMenu = () => {
    setBurgerClass(
      isMenuClicked === true ? "burger-bar unclicked" : "burger-bar clicked"
    );
    setMenuClass(isMenuClicked === true ? "menu hidden" : "menu visible");
    setIsMenuClicked(!isMenuClicked);
  };

  // Keyboard handler for accessibility
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      updateMenu();
    }
  };

  return (
    <div>
      <nav>
        <div
          className="burger-menu"
          onClick={updateMenu}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          aria-expanded={isMenuClicked} // Corrected to use isMenuClicked
          aria-label="Toggle menu"
        >
          <div className={burgerClass} />
          <div className={burgerClass} />
          <div className={burgerClass} />
        </div>
        <div className={menuClass}>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              {user !== null ? (
                <a href="/profile">Profile</a>
              ) : (
                <a href="/profileaccess">Profile</a>
              )}
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/about-us">About Us</a>
            </li>
          </ul>
        </div>
        {isLogoVisible && (
          <div className="logo-box">
            <img src={Logo} className="logo" alt="site logo" />
          </div>
        )}
      </nav>
    </div>
  );
}

NavBar.propTypes = {
  isLogoVisible: PropTypes.bool.isRequired,
};

export default NavBar;
