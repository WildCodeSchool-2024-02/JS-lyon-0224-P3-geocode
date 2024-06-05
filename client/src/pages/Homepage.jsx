import { useState, useEffect } from "react";
import WelcomePage from "../components/Homepage/WelcomePage";
import "../App.css";

export default function HomePage() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showMain, setShowMain] = useState(false);

  const handleTimeout = () => {
    setShowWelcome(false);
    setTimeout(() => {
      setShowMain(true);
    }, 200);
  };

  useEffect(() => {
    if (showMain) {
      const timer = setTimeout(() => {
        document.querySelector(".main-content").classList.add("fade-in");
      }, 10);
      return () => clearTimeout(timer);
    }

    return undefined;
  }, [showMain]);

  return (
    <>
      {showWelcome && <WelcomePage onTimeout={handleTimeout} />}
      {showMain && (
        <div className="main-content">
          <div className="container main-container">
            <h1>
              Hello
              <span className="title"> World</span>
            </h1>
          </div>
          <div className="container secondary-container">
            <h2>Welcome</h2>
          </div>
          <div className="button-container">
            <button className="button" type="button">
              <p>Bye</p>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
