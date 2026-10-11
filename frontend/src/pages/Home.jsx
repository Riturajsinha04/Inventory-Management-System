import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={styles.container}>
      <h1>Welcome to Inventory Management System</h1>
      <p>Track, manage, and update your product inventory in one place.</p>
      <Link to="/products" style={styles.button}>
        View Products
      </Link>
    </div>
  );
}

const styles = {
  container: {
    padding: "60px 20px",
    textAlign: "center",
  },
  button: {
    display: "inline-block",
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#3b82f6",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "6px",
    fontWeight: "500",
  },
};
