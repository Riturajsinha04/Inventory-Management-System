import { useState } from "react";

export default function useAuth() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  function login(data) {
    localStorage.setItem("token", data.token);
    if (data.user) {
      localStorage.setItem("name", data.user.name || "");
      localStorage.setItem("role", data.user.role || "user");
    }
    setToken(data.token);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    setToken(null);
  }

  return {
    token,
    isAuthenticated: Boolean(token),
    login,
    logout,
  };
}
