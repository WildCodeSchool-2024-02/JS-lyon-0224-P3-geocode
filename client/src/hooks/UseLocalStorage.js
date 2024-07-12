import { useState, useEffect } from "react";

const useLocalStorage = (key) => {
  const [value, setValue] = useState(() => localStorage.getItem("user"));

  useEffect(() => {
    const storedVal = typeof value === "object" ? JSON.stringify(value) : value;
    localStorage.setItem(key, storedVal);
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;
