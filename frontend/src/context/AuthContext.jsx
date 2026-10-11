import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch {
        return null;
      }
    }
    const name = localStorage.getItem("name");
    const role = localStorage.getItem("role");
    if (name || role) {
      return { name: name || "", role: role || "user" };
    }
    return null;
  });

  const isAuthenticated = Boolean(token);
  const role = user?.role || localStorage.getItem("role") || "user";

  function login(authToken, userData) {
    localStorage.setItem("token", authToken);
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("name", userData.name || "");
      localStorage.setItem("role", userData.role || "user");
      setUser(userData);
    }
    setToken(authToken);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    setToken("");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        role,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;
