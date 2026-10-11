import { Link } from "react-router-dom";

export default function ProductCard({ product, onDelete }) {
  const role = localStorage.getItem("role");

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.title}>{product.name}</h3>
        <span style={styles.badge}>{product.category}</span>
      </div>

      <div style={styles.details}>
        <p><strong>Price:</strong> ${product.price}</p>
        <p><strong>Quantity:</strong> {product.quantity}</p>
        {product.supplier && <p><strong>Supplier:</strong> {product.supplier}</p>}
      </div>

      {role === "admin" && (
        <div style={styles.actions}>
          <Link to={`/edit-product/${product._id || product.id}`} style={styles.editBtn}>
            Edit
          </Link>
          {onDelete && (
            <button
              onClick={() => onDelete(product._id || product.id)}
              style={styles.deleteBtn}
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    padding: "16px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    margin: 0,
    fontSize: "18px",
    color: "#0f172a",
  },
  badge: {
    backgroundColor: "#e0f2fe",
    color: "#0369a1",
    fontSize: "12px",
    padding: "2px 8px",
    borderRadius: "12px",
    fontWeight: "600",
  },
  details: {
    fontSize: "14px",
    color: "#475569",
    lineHeight: "1.5",
  },
  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "8px",
  },
  editBtn: {
    display: "inline-block",
    backgroundColor: "#3b82f6",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "4px",
    textDecoration: "none",
    fontSize: "13px",
  },
  deleteBtn: {
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "13px",
  },
};
