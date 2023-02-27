import logo from "../postit-logo.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <div className="logo">
        <a href="/" className="logo">
          <img src={logo} alt="logo" />
        </a>
      </div>
      <div className="auth_option_container">
        <Link className="login" to="/login">
          Login
        </Link>
        <Link to="/register">Register</Link>
      </div>
    </header>
  );
}
