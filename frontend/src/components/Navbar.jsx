import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    navigate("/login");
  }

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>
        Inventory System
      </Link>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>

        {token ? (
          <>
            <Link to="/products" style={styles.link}>Products</Link>

            {role === "admin" && (
              <Link to="/add-product" style={styles.link}>
                + Add Product
              </Link>
            )}

            <span style={styles.user}>
              {name || "User"} ({role || "user"})
            </span>

            <button onClick={handleLogout} style={styles.button}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
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
    padding: "12px 24px",
    backgroundColor: "#1e293b",
    color: "#fff",
    flexWrap: "wrap",
    gap: "12px",
  },
  brand: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "bold",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap",
  },
  link: {
    color: "#94a3b8",
    textDecoration: "none",
  },
  user: {
    backgroundColor: "#334155",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "13px",
  },
  button: {
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
