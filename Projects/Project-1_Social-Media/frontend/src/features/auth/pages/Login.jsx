import React, { useState } from "react";
import "../styles/form.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth.js";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, loading } = useAuth();
  const navigate = useNavigate();
  if (loading) {
    return <h1>Loading.......</h1>;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin(username, password).then((res) => {
      console.log(res);
      alert("Login Successful");
      setPassword("");
      setUsername("");
      navigate("/");
    });
  };
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Your Username"
            required
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Your Password"
            required
          />
          <button>Login</button>
        </form>
        <p>
          Already have an account?
          <Link className="toggleForm" to="/register">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
