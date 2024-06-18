import { useLoaderData } from "react-router-dom";
import "./UserCars.css";

import porsche from "../../assets/image/porsche.jpeg";

export default function UserCars() {
  const car = useLoaderData();
  const { brand, model, type } = car;
  return (
    <div className="userCars">
      <h2>
        <span>My cars</span>
      </h2>
      <div className="carInfo container">
        <h3>
          <span>{brand}</span> {model}
        </h3>
        <img src={porsche} alt="" className="img" />
        <p>charging port</p>
        <p>
          <span>{type}</span>
        </p>
      </div>
    </div>
  );
}
