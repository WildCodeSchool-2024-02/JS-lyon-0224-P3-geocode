import { useState } from "react";

const useLocalStorage = (key, initialValue, expiryInMinutes = 60) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return initialValue;

      const parsedItem = JSON.parse(item);

      // Check if the stored item is expired
      const currentTime = new Date().getTime();
      const expiryTime = parsedItem?.expiry || 0;
      if (currentTime > expiryTime) {
        // Set the value to null instead of removing it
        localStorage.setItem(key, JSON.stringify(null));
        return null;
      }

      return parsedItem.value;
    } catch (error) {
      console.error("Error reading localStorage key:", key, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      const expiryTime = new Date().getTime() + expiryInMinutes * 60000;

      const itemToStore = {
        value: valueToStore,
        expiry: expiryTime,
      };

      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(itemToStore));
    } catch (error) {
      console.error("Error setting localStorage key:", key, error);
    }
  };

  const removeItem = () => {
    try {
      // Set the value to null in localStorage
      localStorage.setItem(key, JSON.stringify(null));
      setStoredValue(null);
    } catch (error) {
      console.error("Error removing localStorage key:", key, error);
    }
  };

  return [storedValue, setValue, removeItem];
};

export default useLocalStorage;
