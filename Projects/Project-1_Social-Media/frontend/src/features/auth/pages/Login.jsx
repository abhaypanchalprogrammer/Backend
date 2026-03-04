import React, { useState } from "react";
import "../styles/form.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth.js";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = useAuth();
 const [loading,setLoading]= useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
      setError("");
    try {
      const res = await handleLogin(username, password);
      if (!res) return;
      console.log(res);
      setPassword("");
      setUsername("");
      navigate("/home");
    } catch (error) {
      setError(error.response?.data?.message || "Login Failed");
    }finally{
      setLoading(false);
    }
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
          <p style={{ color: "red", display: "flex", alignItems: "center" }}>
            {error}
          </p>
          <button className="button primary-button" disabled={loading}>
            {loading ? "Please wait..." : "Login"}
          </button>
        </form>
        <p>
          Don't have any Account?
          <Link className="toggleForm" to="/register">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
