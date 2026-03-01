import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth.js";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate();
  const { handleRegister } = useAuth();

  const handleFormSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const res = await handleRegister(username, email, password);

    if (!res) return;

    setUsername("");
    setPassword("");
    setEmail("");

    navigate("/home");
  } catch (error) {
    setError(error.response?.data?.message || "Registration Failed");
  } finally {
    setLoading(false); 
  }
};

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Your Username"
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Your Password"
          />
          <p style={{ color: "red" }}>{error}</p>
          <button
  className="button register-button"
  disabled={loading}
>
  {loading ? "Setting Up..." : "Register"}
</button>
        </form>
        <p>
          Already have an account?
          <Link className="toggleForm" to="/">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
