// useSignUpForm.js

import { useState } from "react";

const UseSignUpForm = (initialState) => {
  const [formValues, setFormValues] = useState(initialState);
  const [formErrors, setFormErrors] = useState({
    firstname: "",
    lastname: "",
    city: "",
    email: "",
    password: "",
    password2: "",
    cars: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const setError = (name, message) => {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: message,
    }));
  };

  const setSuccess = (name) => {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateInputs = () => {
    const { firstname, lastname, city, email, password, password2 } =
      formValues;
    const fields = [
      {
        name: "firstname",
        value: firstname,
        message: "Firstname is required",
        minLength: 3,
        errorMessage: "Firstname must be at least 3 characters long",
      },
      {
        name: "lastname",
        value: lastname,
        message: "Lastname is required",
        minLength: 2,
        errorMessage: "Lastname must be at least 2 characters long",
      },
      {
        name: "city",
        value: city,
        message: "City is required",
        minLength: 2,
        errorMessage: "City must be at least 2 characters long",
      },
      {
        name: "email",
        value: email,
        message: "Email is required",
        errorMessage: "Provide a valid email address",
      },
      {
        name: "password",
        value: password,
        message: "Password is required",
        minLength: 8,
        errorMessage: "Password must be at least 8 characters long",
      },
      {
        name: "password2",
        value: password2,
        message: "Please confirm your password",
        match: password,
        errorMessage: "Passwords don't match",
      },
    ];

    let allValid = true;

    fields.forEach(
      ({ name, value, message, errorMessage, minLength, match }) => {
        if (value.trim() === "") {
          setError(name, message);
          allValid = false;
        } else if (minLength && value.length < minLength) {
          setError(name, errorMessage);
          allValid = false;
        } else if (name === "email" && !validateEmail(value)) {
          setError(name, "Provide a valid email address");
          allValid = false;
        } else if (match !== undefined && value !== match) {
          setError(name, errorMessage);
          allValid = false;
        } else {
          setSuccess(name);
        }
      }
    );

    return allValid;
  };

  return {
    formValues,
    formErrors,
    handleChange,
    validateInputs,
    setFormValues,
    setFormErrors,
  };
};

export default UseSignUpForm;
