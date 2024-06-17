import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./UserInfo.css";

export default function UserInfo() {
  return (
    <div className="profileComponent">
      <div className="profileInfo container">
        <FaRegUserCircle className="profileLogo" />
        <h2>
          <span>Jeff Jefferson</span>
        </h2>
        <h3>Email</h3>
        <h3>City</h3>
        <Link to="/profile/edit">
          <button type="button" className="button">
            <h3>edit</h3>
          </button>
        </Link>
      </div>
    </div>
  );
}