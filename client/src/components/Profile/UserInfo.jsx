import { FaRegUserCircle } from "react-icons/fa";
import "./UserInfo.css";

export default function UserInfo() {
  return (
    <div className="userInfo">
      <div>
        <FaRegUserCircle />
      </div>
      <h2>jeff</h2>
      <p>Email</p>
      <p>City</p>
      <button type="button">edit</button>
    </div>
  );
}
