import { useState } from "react";
import PropTypes from "prop-types";
import { Form } from "react-router-dom";
import "../components/SignUp/SignUp.css";

function SignUp({ handleSignUp }) {
  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    city: "",
    email: "",
    password: "",
    password2: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstname: "",
    lastname: "",
    city: "",
    email: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      firstname: formValues.firstname,
      lastname: formValues.lastname,
      city: formValues.city,
      email: formValues.email,
      password: formValues.password,
      password2: formValues.password2,
    };

    if (validateInputs()) {
      const result = await handleSignUp({ formData });

      if (result.success) {
        window.location.href = "/contact";
      } else {
        setError("form", result.error);
      }
    }
  };

  return (
    <Form method="post" className="bodyform" id="form" onSubmit={handleSubmit}>
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
            autoComplete="off"
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
            autoComplete="off"
          />
          {formErrors.lastname !== "" && (
            <div className="error">{formErrors.lastname}</div>
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
            autoComplete="off"
          />
          {formErrors.city !== "" && (
            <div className="error">{formErrors.city}</div>
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
            autoComplete="off"
          />
          {formErrors.email !== "" && (
            <div className="error">{formErrors.email}</div>
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
            autoComplete="new-password"
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
            autoComplete="new-password"
          />
          {formErrors.password2 !== "" && (
            <div className="error">{formErrors.password2}</div>
          )}
        </label>
        <button className="button" id="signupbut" type="submit">
          Submit
        </button>
        {formErrors.form && <div className="error">{formErrors.form}</div>}
      </div>
    </Form>
  );
}

SignUp.propTypes = {
  handleSignUp: PropTypes.func.isRequired,
};

export default SignUp;
