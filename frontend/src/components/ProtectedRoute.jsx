import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && role !== "admin") {
    return (
      <div style={styles.forbidden}>
        <h2>403 - Access Denied</h2>
        <p>This page requires Administrator privileges.</p>
      </div>
    );
  }

  return children;
}

const styles = {
  forbidden: {
    maxWidth: "500px",
    margin: "80px auto",
    padding: "32px",
    textAlign: "center",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    border: "1px solid #fee2e2",
    color: "#b91c1c",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
};
