import { useContext, useEffect } from "react";
import ConnectionPage from "../components/ProfileAccess/Connectionpage";
import { LogoContext } from "../components/Context/LogoContext";

export default function ProfileAccess() {
  const { setShowLogo } = useContext(LogoContext);

  useEffect(() => {
    setShowLogo(false);
    return () => {
      setShowLogo(true);
    };
  }, [setShowLogo]);

  useEffect(() => {
    document.body.classList.add("connection-page-background");

    return () => {
      document.body.classList.remove("connection-page-background");
    };
  }, []);

  return <ConnectionPage />;
}
