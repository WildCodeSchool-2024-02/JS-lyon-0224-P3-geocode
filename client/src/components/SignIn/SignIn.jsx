import { useNavigate, Form } from "react-router-dom";
import { useState } from "react";
import { useUserContext } from "../../context/UserContext";
import handleSignIn from "../../API/HandleSignIn";
import logo from "../../assets/image/geocode4.svg";
import "../../Styles/SignIn.css";

export default function SignInPage() {
  const navigate = useNavigate();
  const { login } = useUserContext();

  const [signInValues, setSignInValues] = useState({
    email: "",
    password: "",
  });

  const [signInErrors, setSignInErrors] = useState({
    email: "",
    password: "",
    form: "",
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

    if (validateInputs() === true) {
      try {
        const result = await handleSignIn({ signInData });

        if (result.success) {
          login({ id: result.id, email: result.user });
          navigate(`/profile`);
        } else {
          console.error("Sign-in failed:", result.error);
          throw new Error(result.error);
        }
      } catch (error) {
        if (error.response === true && error.response.status === 422) {
          setError("form", "Incorrect email or password");
        } else {
          setError("form", "Incorrect email or password");
        }
        console.error("Sign-in error:", error);
      }
    }
  };

  return (
    <Form className="logInComponent" method="post" onSubmit={handleSubmit}>
      <img src={logo} alt="" className="imageLogo" />
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
        {signInErrors.form !== "" && (
          <span className="error">{signInErrors.form}</span>
        )}
        <a href="/signin" className="forgetPassword">
          <span>Forget password?</span>
        </a>
        <button className="button" type="submit">
          Log in
        </button>
      </div>
    </Form>
  );
}
