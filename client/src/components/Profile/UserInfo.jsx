import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { FaRegUserCircle } from "react-icons/fa";
import { useUserContext } from "../../context/UserContext";
import "../../Styles/UserInfo.css";

export default function UserInfo({ user }) {
  const { firstname, lastname, email, city, image } = user;
  const { signout } = useUserContext();

  const handleSignout = async () => {
    try {
      await signout(true);
    } catch (error) {
      console.error("Error during sign out", error);
    }
  };

  return (
    <div className="profileComponent">
      <div className="profileInfo container">
        <div className="photoComponent">
          {image !== "" && image !== null ? (
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
        <div className="btn-component">
          <Link to={`/profile/${user.id}/edit`}>
            <button type="button" className="button">
              Edit
            </button>
          </Link>
          <button type="button" className="deletebtn" onClick={handleSignout}>
            Sign out
          </button>
        </div>
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
