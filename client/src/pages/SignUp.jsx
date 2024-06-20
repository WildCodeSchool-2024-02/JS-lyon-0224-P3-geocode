import { useState } from "react";
import { Form } from "react-router-dom";
import "../components/SignUp/SignUp.css";

function SignUp() {
  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    city: "",
    password: "",
    password2: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    city: "",
    password: "",
    password2: "",
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

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());

  const validateInputs = () => {
    const { firstname, lastname, email, city, password, password2 } =
      formValues;
    const fields = [
      {
        name: "firstname",
        value: firstname,
        message: "Firstname is required",
        minLength: 2,
        errorMessage: "Firstname must be at least 2 characters long",
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
        passwordMinLength: 8,
        errorMessage: "Password must be at least 8 characters long",
      },
      {
        name: "password2",
        value: password2,
        message: "Please confirm your password",
        errorMessage: "Passwords don't match",
      },
    ];

    let allValid = true;

    fields.forEach(
      ({ name, value, message, errorMessage, passwordMinLength }) => {
        if (value.trim() === "") {
          setError(name, message);
          allValid = false;
        } else if (name === "email") {
          if (isValidEmail(value) === false) {
            setError(name, errorMessage);
            allValid = false;
          } else {
            setSuccess(name);
          }
        } else if (passwordMinLength && value.length < passwordMinLength) {
          setError(name, errorMessage);
          allValid = false;
        } else if (password && value !== password) {
          setError(name, errorMessage);
          allValid = false;
        } else {
          setSuccess(name);
        }
      }
    );

    if (allValid) {
      window.location.href = "../html/index.html";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateInputs();
  };

  return (
    <Form type="submit" className="bodyform" id="form" onSubmit={handleSubmit}>
      <div className="inscription-component">
        <h1>Sign Up</h1>
        <label className="input-control">
          <input
            className="input container"
            type="text"
            id="firstname"
            name="firstname"
            placeholder="Firstname"
            value={formValues.firstname}
            onChange={handleChange}
          />
          {formErrors.firstname !== "" && (
            <div className="error">{formErrors.firstname}</div>
          )}
        </label>
        <label className="input-control">
          <input
            className="input container"
            type="text"
            id="lastname"
            name="lastname"
            placeholder="Lastname"
            value={formValues.lastname}
            onChange={handleChange}
          />
          {formErrors.lastname !== "" && (
            <div className="error">{formErrors.lastname}</div>
          )}
        </label>
        <label className="input-control">
          <input
            className="input container"
            type="email"
            id="email"
            placeholder="Email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
          />
          {formErrors.email !== "" && (
            <div className="error">{formErrors.email}</div>
          )}
        </label>
        <label className="input-control">
          <input
            className="input container"
            type="text"
            id="city"
            name="city"
            placeholder="City"
            value={formValues.city}
            onChange={handleChange}
          />
          {formErrors.city !== "" && (
            <div className="error">{formErrors.city}</div>
          )}
        </label>
        <label className="input-control">
          <input
            className="input container"
            type="password"
            id="password"
            placeholder="Password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
          />
          {formErrors.password !== "" && (
            <div className="error">{formErrors.password}</div>
          )}
        </label>
        <label className="input-control">
          <input
            className="input container"
            type="password"
            id="password2"
            placeholder="Confirm Password"
            name="password2"
            value={formValues.password2}
            onChange={handleChange}
          />
          {formErrors.password2 !== "" && (
            <div className="error">{formErrors.password2}</div>
          )}
        </label>
        <button className="button" id="signupbut" type="submit">
          <h3>Submit</h3>
        </button>
      </div>
    </Form>
  );
}

export default SignUp;
