import React from "react";
import "../style/style.scss";
import { Link } from "react-router-dom";
import FormGroup from "../components/FormGroup.jsx";
const Login = () => {
  return (
    <main className="login-page">
      <div className="form-container">
        <h1>Login</h1>
        <form action="">
          <FormGroup label="Email" placeholder="Email" type="email" />
          <FormGroup label="Password" placeholder="Password" type="password" />
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
          <button className="button" type="submit">
            Login
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
