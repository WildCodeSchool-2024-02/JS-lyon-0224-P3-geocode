import { useNavigate, Form } from "react-router-dom";
import UseSignUpForm from "../hooks/UseSignUpForm";

function SignUp() {
  const navigate = useNavigate();
  const { formValues, formErrors, handleChange, validateInputs } =
    UseSignUpForm({
      firstname: "",
      lastname: "",
      city: "",
      email: "",
      password: "",
      password2: "",
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInputs() !== false) {
      // Proceed to car signup page with user data
      navigate("/signup/car", { state: { user: formValues } });
    }
  };

  return (
    <Form method="post" className="bodyform" id="form" onSubmit={handleSubmit}>
      <div className="inscription-component">
        <h1>User Sign Up</h1>
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
          Next
        </button>
      </div>
    </Form>
  );
}

export default SignUp;
