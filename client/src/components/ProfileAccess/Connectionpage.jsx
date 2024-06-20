import "./ConnectionPage.css";
import logo from "../../assets/image/geocode4.svg";

export default function ConnectionPage() {
  return (
    <div className="connectionPage">
      <img src={logo} alt="" className="imageLogo" />
      <button className="btn" type="button">
        <a href=".">
          <h3>Sign in</h3>
        </a>
      </button>
      <button className="btn" type="button">
        <a href="/signup">
          <h3>Create an account</h3>
        </a>
      </button>
    </div>
  );
}
