import { Form } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";
import "./SignIn.css";

export default function SignInPage({ handleSignIn }) {
  const [signInValues, setSignInValues] = useState({
    email: "",
    password: "",
  });

  const [signInErrors, setSignInErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignInValues({
      ...signInValues,
      [name]: value,
    });
  };

  const setError = (name, message) => {
    setSignInErrors((prevErrors) => ({
      ...prevErrors,
      [name]: message,
    }));
  };

  const setSuccess = (name) => {
    setSignInErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateInputs = () => {
    const { email, password } = signInValues;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const signInData = {
      email: signInValues.email,
      password: signInValues.password,
    };

    if (validateInputs()) {
      const result = await handleSignIn({ signInData });
      if (result.success) {
        window.location.href = "/";
      } else {
        setError("form", result.error);
        console.error("Sign-in error:", result.error);
      }
    }
  };

  return (
    <Form className="logInComponent" method="post" onSubmit={handleSubmit}>
      <div className="logIn">
        <p>Acces to your profile</p>
        <label>
          <input
            className="emailInput container"
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={signInValues.email}
            onChange={handleChange}
            autoComplete="off"
            required
          />
          {signInErrors.email !== "" && (
            <span className="error">{signInErrors.email}</span>
          )}
        </label>
        <label>
          <input
            className="passwordInput container"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={signInValues.password}
            onChange={handleChange}
            autoComplete="off"
            required
          />
          {signInErrors.password !== "" && (
            <span className="error">{signInErrors.password}</span>
          )}
        </label>
        <a href="/signin" className="forgetPassword">
          <p>
            <span>Forget password?</span>
          </p>
        </a>
        <button className="button" type="submit">
          Log in
        </button>
      </div>
    </Form>
  );
}

SignInPage.propTypes = {
  handleSignIn: PropTypes.func.isRequired,
};
