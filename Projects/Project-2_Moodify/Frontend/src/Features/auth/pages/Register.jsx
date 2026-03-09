import React, { useState } from "react";
import FormGroup from "../components/FormGroup.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import Loader from "../../shared/components/Loader.jsx";
const Register = () => {
  const { loading, handleRegister } = useAuth();
  const [ data, setData ] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(data);
    navigate("/");
  };
  if (loading) {
    return <Loader />;
  }

  return (
    <main className="register-page">
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <FormGroup
            label="Username"
            value={data.username}
            onChange={(e) => {
              setData({ ...data, username: e.target.value });
            }}
            placeholder="Username"
            type="text"
          />
          <FormGroup
            label="Email"
            value={data.email}
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
            }}
            placeholder="Email"
            type="email"
          />
          <FormGroup
            label="Password"
            value={data.password}
            onChange={(e) => {
              setData({ ...data, password: e.target.value });
            }}
            placeholder="Password"
            type="password"
          />
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
