//imports
import "./FrontPage.css";
import ButtonTransparent from "../../components/ButtonTransparent/ButtonTransparent.tsx";
import { Link } from "react-router-dom";

function FrontPage() {
  return (
    <div className="FrontPage">
      <h1>Hello, and welcome to Webshop Builder! 😁</h1>
      <p>Get started by logging in</p>
      <div className="buttons">
        <Link to="/login">
          <ButtonTransparent>Login</ButtonTransparent>
        </Link>
        <Link to="/register">
          <ButtonTransparent>Register</ButtonTransparent>
        </Link>
      </div>
    </div>
  );
}

export default FrontPage;
