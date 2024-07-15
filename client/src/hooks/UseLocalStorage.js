import { useState } from "react";

const useLocalStorage = (key, initialValue, expiryInMinutes = 60) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return initialValue;

      const parsedItem = JSON.parse(item);
      const currentTime = new Date().getTime();
      const expiryTime = parsedItem.expiry || 0;

      // Check if the stored item is expired
      if (currentTime > expiryTime) {
        localStorage.removeItem(key);
        return initialValue;
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
      localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error("Error removing localStorage key:", key, error);
    }
  };

  return [storedValue, setValue, removeItem];
};

export default useLocalStorage;
