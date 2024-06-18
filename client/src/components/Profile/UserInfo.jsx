import { FaRegUserCircle } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import "./UserInfo.css";

export default function UserInfo() {
  const user = useLoaderData();
  const { firstname, lastname, email, city, image } = user;
  return (
    <div className="profileComponent">
      <div className="profileInfo container">
        {image ? <img src={image} alt="user profile" /> : <FaRegUserCircle />}
        <h2>
          <span>
            `${firstname} ${lastname}`
          </span>
        </h2>
        <h3>Email: {email}</h3>
        <h3>City: {city}</h3>
        <button type="button" className="button">
          <h3>edit</h3>
        </button>
      </div>
    </div>
  );
}
