import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { FaRegUserCircle } from "react-icons/fa";
import "./UserInfo.css";

export default function UserInfo({ user }) {
  const { firstname, lastname, email, city, image } = user;

  return (
    <div className="profileComponent">
      <div className="profileInfo container">
        <div className="photoComponent">
          {image !== null ? (
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
        <div className="UserContact">
          <div className="field">
            <p>
              <span>Email: </span>
            </p>
            <p>
              <span>City: </span>
            </p>
          </div>
          <div className="coordinates">
            <p>{email}</p>
            <p>{city}</p>
          </div>
        </div>
        <Link to={`/profile/${user.id}/edit`}>
          <button type="button" className="button">
            <h3>Edit</h3>
          </button>
        </Link>
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
    id: propTypes.number,
  }).isRequired,
};
