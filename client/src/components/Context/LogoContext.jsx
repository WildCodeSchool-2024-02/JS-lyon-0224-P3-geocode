import propTypes from "prop-types";
import { createContext, useState, useMemo } from "react";

export const LogoContext = createContext();

export function LogoProvider({ children }) {
  const [showLogo, setShowLogo] = useState(true);

  const hideLogo = useMemo(
    () => ({ showLogo, setShowLogo }),
    [showLogo, setShowLogo]
  );

  return (
    <LogoContext.Provider value={hideLogo}>{children}</LogoContext.Provider>
  );
}

LogoProvider.propTypes = {
  children: propTypes.node.isRequired,
};
