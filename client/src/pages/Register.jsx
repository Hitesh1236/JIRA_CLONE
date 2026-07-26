import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Register.css';
import api from "../services/api";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post('/auth/register', {
        name,
        email,
        password: pass,
      });

      if (response?.status === 201 || response?.status === 200) {
        navigate("/");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Registration failed.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            name="pass"
            value={pass}
            placeholder="Enter your password"
            onChange={(e) => setPass(e.target.value)}
          />

          <button type="submit">Register</button>

          {error && <p className="form-error">{error}</p>}

          <Link className="login-link" to="/">
            Back to login?
          </Link>
        </form>
      </div>
    </div>
  );
}
