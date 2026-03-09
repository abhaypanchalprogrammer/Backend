import React, { useState } from "react";
import "../style/style.scss";
import { Link, useNavigate } from "react-router-dom";
import FormGroup from "../components/FormGroup.jsx";
import { useAuth } from "../hooks/useAuth.js";
import Loader from "../../shared/components/Loader.jsx";
const Login = () => {
  const { loading, handleLogin } = useAuth();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      password: formData.password,
    };
    if (formData.identifier.includes("@")) {
      loginData.email = formData.identifier;
    } else {
      loginData.username = formData.identifier;
    }
    await handleLogin(loginData);
    navigate("/");
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <main className="login-page">
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <FormGroup
            label="Email"
            placeholder="Email"
            value={formData.identifier}
            onChange={(e) =>
              setFormData({ ...formData, identifier: e.target.value })
            }
            type="text"
          />
          <FormGroup
            label="Password"
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
            placeholder="Password"
            type="password"
          />
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
