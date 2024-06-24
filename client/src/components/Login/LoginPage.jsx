import { Form } from "react-router-dom";
import { useState } from "react";
import "./LoginPage.css";

export default function LoginPage() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
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

  const validateInputs = () => {
    const { email, password } = formValues;
    const fields = [
      {
        name: "email",
        value: email,
        message: "Email is required",
        errorMessage: "Please enter a valid email",
      },
      {
        name: "password",
        value: password,
        message: "Password is required",
        minLength: 8,
        errorMessage: "Password must be at least 8 characters long",
      },
    ];

    let allValid = true;

    fields.forEach(({ name, value, message, errorMessage, minLength }) => {
      if (value.trim() === "") {
        setError(name, message);
        allValid = false;
      } else if (minLength && value.length < minLength) {
        setError(name, errorMessage);
        allValid = false;
      } else {
        setSuccess(name);
      }
    });

    return allValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      // Send the form data to the server
      // console.log(formValues);
    }
  };

  return (
    <Form method="post" onSubmit={handleSubmit}>
      <div className="logIn container">
        <label className="emailInput">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formValues.email}
            onChange={handleChange}
            required
          />
          {formErrors.email && (
            <span className="error">{formErrors.email}</span>
          )}
        </label>
      </div>
      <div className="passwordInput container">
        <label className="passwordInput">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formValues.password}
            onChange={handleChange}
            required
          />
          {formErrors.password && (
            <span className="error">{formErrors.password}</span>
          )}
        </label>
        <button className="button" type="submit">
          Log in
        </button>
      </div>
    </Form>
  );
}
