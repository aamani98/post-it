import { useState } from "react";
import { Link } from "react-router-dom";
import { storeToken } from "../utils/authStorage";
import axios, { setAuthHeader } from "../utils/axiosInstance";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    try {
      const {
        data: {
          data: { token },
        },
      } = await axios.post("auth/login/", {
        email,
        password,
      });
      console.log(token);
      setAuthHeader(token);
      storeToken(token);
    } catch {
      console.log(e);
    }
  };
  return (
    <div className="login">
      <form onSubmit={login}>
        <h2>Login to PostIt</h2>
        <fieldset>
          <label htmlFor="login">Email</label>
          <input
            type="email"
            required
            name="login"
            id="login"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            required
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>
        <button type="submit">Login</button>
        <p>
          Not a member?{" "}
          <Link to="/register" replace="true">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
