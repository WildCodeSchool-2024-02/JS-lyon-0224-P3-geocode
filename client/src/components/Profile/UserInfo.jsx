import propTypes from "prop-types";
import { FaRegUserCircle } from "react-icons/fa";
import "./UserInfo.css";

export default function UserInfo({ user }) {
  const { firstname, lastname, email, city, image } = user;

  return (
    <div className="profileComponent">
      <div className="profileInfo container">
        <div className="photoComponent">
          {image ? (
            <img src={image} alt="user profile" className="profilePhoto" />
          ) : (
            <FaRegUserCircle className="noPhoto" />
          )}
        </div>
        <h2>
          <span>
            {firstname} {lastname}
          </span>
        </h2>
        <h3>Email: {email}</h3>
        <h3>City: {city}</h3>
        <button type="button" className="button">
          <h3>Edit</h3>
        </button>
      </div>
    </div>
  );
}

UserInfo.propTypes = {
  user: propTypes.shape({
    firstname: propTypes.string.isRequired,
    lastname: propTypes.string.isRequired,
    email: propTypes.string.isRequired,
    city: propTypes.string.isRequired,
    image: propTypes.string,
  }).isRequired,
};
