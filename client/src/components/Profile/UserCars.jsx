import "./UserCars.css";
import porsche from "../../assets/image/porsche.jpeg";

export default function UserCars() {
  return (
    <div className="userCars">
      <h2>
        <span>My cars</span>
      </h2>
      <div className="carInfo container">
        <h3>
          <span>Porsche</span> Taycan
        </h3>
        <img src={porsche} alt="" className="img" />
        <p>charging port</p>
        <p>
          <span>type 2</span>
        </p>
      </div>
    </div>
  );
}
