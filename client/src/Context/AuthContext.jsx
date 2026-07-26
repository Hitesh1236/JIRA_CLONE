import { useState } from "react";
import api from "../services/api";
import { AuthContext } from "./AuthContextValue.jsx";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const login = async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    const newToken = response?.data?.token;
    if (!newToken) {
      throw new Error("Login response did not include a token.");
    }
    localStorage.setItem("token", newToken);
    setToken(newToken);
    return response;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated: Boolean(token), login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
