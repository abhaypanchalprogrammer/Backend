import React, { useState } from "react";
import "../styles/form.scss";
import { Link } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3001/api/auth/login",
        { username, password },
        { withCredentials: true },
      )
      .then((res) => console.log(res.data))
      .then(() => {
        alert("Login Successful");
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
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Your Username"
          />
          <input
            type="text"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Your Password"
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
