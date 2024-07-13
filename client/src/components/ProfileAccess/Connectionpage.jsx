import "../../Styles/ConnectionPage.css";
import logo from "../../assets/image/geocode4.svg";

export default function ConnectionPage() {
  return (
    <div className="connectionPage">
      <img src={logo} alt="" className="imageLogo" />
      <button className="btn" type="button">
        <a href="SignIn">Sign in</a>
      </button>
      <button className="btn" type="button">
        <a href="/signup">Create an account</a>
      </button>
    </div>
  );
}
