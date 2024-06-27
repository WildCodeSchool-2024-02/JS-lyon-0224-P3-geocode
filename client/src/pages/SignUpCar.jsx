import { useState } from "react";
import { useLocation, useNavigate, Form } from "react-router-dom";
import CarInput from "../components/SignUp/CarInput";
import handleSignUp from "../utils/HandleSignUp";

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
  };

  const handleAddCar = () => {
    setCars([...cars, { key: Date.now(), brand: "", model: "", socket: "" }]);
  };

  const handleRemoveCar = (key) => {
    setCars(cars.filter((car) => car.key !== key));
  };

  const validateCars = () => {
    let valid = true;
    const errors = {};
    cars.forEach((car, index) => {
      if (car.brand === null || car.model === null || car.socket === null) {
        errors[index] = "All fields are required";
        valid = false;
      } else {
        errors[index] = "";
      }
    });
    setCarErrors(errors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateCars() !== false) {
      const result = await handleSignUp({ user: state.user, cars });

      if (result.success === true) {
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
            />
            {carErrors[index] !== "" && (
              <div className="error">{carErrors[index]}</div>
            )}
          </div>
        ))}
        <button type="button" className="button" onClick={handleAddCar}>
          Add Another Car
        </button>
        <button className="button" id="signupbut" type="submit">
          Submit
        </button>
      </div>
    </Form>
  );
}

export default CarSignUp;
