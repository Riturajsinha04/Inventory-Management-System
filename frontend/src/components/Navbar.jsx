import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, role, user, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const displayName = user?.name || "User";

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>
        📦 Inventory System
      </Link>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>

        {isAuthenticated ? (
          <>
            <Link to="/products" style={styles.link}>Products</Link>

            {role === "admin" && (
              <Link to="/add-product" style={styles.adminLink}>
                + Add Product
              </Link>
            )}

            <span style={styles.userBadge}>
              <span style={styles.userName}>{displayName}</span>
              <span
                style={{
                  ...styles.rolePill,
                  backgroundColor: role === "admin" ? "#7c3aed" : "#0284c7",
                }}
              >
                {role.toUpperCase()}
              </span>
            </span>

            <button onClick={handleLogout} style={styles.logoutBtn}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.registerBtn}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 28px",
    backgroundColor: "#0f172a",
    color: "#fff",
    flexWrap: "wrap",
    gap: "12px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  brand: {
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "19px",
    fontWeight: "700",
    letterSpacing: "-0.5px",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    flexWrap: "wrap",
  },
  link: {
    color: "#cbd5e1",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "14px",
  },
  adminLink: {
    color: "#38bdf8",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "14px",
    backgroundColor: "rgba(56, 189, 248, 0.12)",
    padding: "4px 10px",
    borderRadius: "6px",
  },
  registerBtn: {
    backgroundColor: "#2563eb",
    color: "#ffffff",
    padding: "6px 14px",
    borderRadius: "6px",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
  },
  userBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#1e293b",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "13px",
  },
  userName: {
    color: "#e2e8f0",
    fontWeight: "500",
  },
  rolePill: {
    color: "#ffffff",
    fontSize: "10px",
    fontWeight: "700",
    padding: "2px 6px",
    borderRadius: "10px",
    letterSpacing: "0.5px",
  },
  logoutBtn: {
    backgroundColor: "#ef4444",
    color: "#ffffff",
    border: "none",
    padding: "6px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
  },
};
