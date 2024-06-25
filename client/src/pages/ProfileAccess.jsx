import { useEffect } from "react";
import ConnectionPage from "../components/ProfileAccess/Connectionpage";

export default function ProfileAccess() {
  useEffect(() => {
    document.body.classList.add("connection-page-background");

    return () => {
      document.body.classList.remove("connection-page-background");
    };
  }, []);

  return <ConnectionPage />;
}
