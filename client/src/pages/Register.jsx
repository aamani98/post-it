import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axiosInstance";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();
    const response = await axios.post("auth/register/", {
      email,
      password,
    });

    console.log(response.data);
  };

  return (
    <div className="register">
      <form onSubmit={register}>
        <h2>Register to PostIt</h2>
        <fieldset>
          <label htmlFor="register">Email</label>
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
        <button type="submit">Register</button>
        <p>
          Already a member? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
