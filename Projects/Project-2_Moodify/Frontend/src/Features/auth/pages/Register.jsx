import React from "react";
import FormGroup from "../components/FormGroup.jsx";
import { Link } from "react-router-dom";
const Register = () => {
  return (
    <main className="register-page">
      <div className="form-container">
        <h1>Register</h1>
        <form>
          <FormGroup label="Username" placeholder="Username" type="text" />
          <FormGroup label="Email" placeholder="Email" type="email" />
          <FormGroup label="Password" placeholder="Password" type="password" />
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
          <button className="button" type="submit">
            Register
          </button>
        </form>
      </div>
    </main>
  );
};

export default Register;
