import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await API.post("/auth/login", {
        email: email.trim(),
        password,
      });

      const { token, user } = response.data;
      if (token) {
        login(token, user);
        navigate("/products");
      } else {
        setError("Login succeeded but no token received.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Sign In</h2>
        <p style={styles.subtitle}>Enter your credentials to access your inventory</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {error && <div style={styles.errorBox}>{error}</div>}

        <p style={styles.footerText}>
          Don&apos;t have an account?{" "}
          <Link to="/register" style={styles.link}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "75vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  card: {
    maxWidth: "420px",
    width: "100%",
    backgroundColor: "#ffffff",
    padding: "36px 32px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e2e8f0",
    textAlign: "center",
  },
  title: {
    margin: "0 0 8px 0",
    color: "#0f172a",
    fontSize: "24px",
    fontWeight: "700",
  },
  subtitle: {
    margin: "0 0 24px 0",
    color: "#64748b",
    fontSize: "14px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    textAlign: "left",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#334155",
  },
  input: {
    padding: "10px 14px",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
    outline: "none",
  },
  button: {
    marginTop: "8px",
    padding: "11px",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
  },
  errorBox: {
    marginTop: "16px",
    padding: "10px 14px",
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
    borderRadius: "6px",
    fontSize: "13px",
    textAlign: "left",
  },
  footerText: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#64748b",
  },
  link: {
    color: "#2563eb",
    fontWeight: "600",
    textDecoration: "none",
  },
};
