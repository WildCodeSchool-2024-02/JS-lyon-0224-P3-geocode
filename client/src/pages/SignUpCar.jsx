import { useState } from "react";
import { useLocation, useNavigate, Form } from "react-router-dom";
import CarInput from "../components/SignUp/CarInput";
import handleSignUp from "../API/HandleSignUp";
import "../Styles/SignUpCars.css";

function CarSignUp() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [cars, setCars] = useState([
    { key: Date.now(), brand: "", model: "", socket: "" },
  ]);
  const [carErrors, setCarErrors] = useState({});

  const handleCarChange = (key, e) => {
    const { name, value } = e.target;
    setCars((prevCars) =>
      prevCars.map((car) => (car.key === key ? { ...car, [name]: value } : car))
    );
    setCarErrors((prevErrors) => ({ ...prevErrors, [key]: "" }));
  };

  const setError = (name, message) => {
    setCarErrors((prevErrors) => ({ ...prevErrors, [name]: message }));
  };

  const setSuccess = (name) => {
    setCarErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleAddCar = () => {
    setCars([...cars, { key: Date.now(), brand: "", model: "", socket: "" }]);
    setCarErrors((prevErrors) => ({ ...prevErrors, [Date.now()]: "" }));
  };

  const handleRemoveCar = (key) => {
    setCars(cars.filter((car) => car.key !== key));
    setCarErrors((prevErrors) => {
      const { [key]: omit, ...rest } = prevErrors;
      return rest;
    });
  };

  const validateCars = () => {
    let valid = true;
    const errors = {};
    cars.forEach((car) => {
      if (
        car.brand.trim() === "" ||
        car.model.trim() === "" ||
        car.socket.trim() === ""
      ) {
        errors[car.key] = "All fields are required";
        valid = false;
      } else {
        errors[car.key] = "";
      }
    });
    setCarErrors(errors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateCars()) {
      const result = await handleSignUp({ user: state.user, cars });

      if (result.success) {
        navigate("/");
      } else {
        console.error("SignUp failed:", result.error);
      }
    }
  };

  return (
    <Form method="post" className="bodyform" id="form" onSubmit={handleSubmit}>
      <div className="inscription-component">
        <h1>Car Sign Up</h1>
        {cars.map((car, index) => (
          <div key={car.key}>
            <CarInput
              car={car}
              handleCarChange={handleCarChange}
              handleRemoveCar={handleRemoveCar}
              setError={setError}
              setSuccess={setSuccess}
              showRemoveButton={index !== 0} // Only show the remove button for subsequent inputs
            />
            {carErrors[car.key] && (
              <div className="error">{carErrors[car.key]}</div>
            )}
          </div>
        ))}
        <div className="signUpCarBtn">
          <button type="button" className="button" onClick={handleAddCar}>
            Add Car
          </button>
          <button className="button" id="signupbut" type="submit">
            Submit
          </button>
        </div>
      </div>
    </Form>
  );
}

export default CarSignUp;
