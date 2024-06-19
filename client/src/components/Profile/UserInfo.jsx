import Image from "../../assets/image/porsche.jpeg";
import "./UserInfo.css";

export default function UserInfo() {
  return (
    <div className="profileComponent">
      <div className="profileInfo container">
        <div className="photoComponent">
          <img src={Image} alt="" className="profilePhoto" />
        </div>
        <h2>
          <span>Jeff Jefferson</span>
        </h2>
        <h3>Email</h3>
        <h3>City</h3>
        <button type="button" className="button">
          <h3>edit</h3>
        </button>
      </div>
    </div>
  );
}
