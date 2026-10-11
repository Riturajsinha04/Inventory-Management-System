import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProductCard({ product, onDelete, onStockUpdate }) {
  const { role } = useAuth();
  const id = product._id || product.id;
  const quantity = Number(product.quantity) || 0;

  // Determine stock badge status
  let stockBadge = {
    label: "In Stock",
    bg: "#dcfce7",
    color: "#15803d",
  };

  if (quantity === 0) {
    stockBadge = {
      label: "Out of Stock",
      bg: "#fee2e2",
      color: "#b91c1c",
    };
  } else if (quantity <= 5) {
    stockBadge = {
      label: `Low Stock (${quantity})`,
      bg: "#fef3c7",
      color: "#b45309",
    };
  }

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.title}>{product.name}</h3>
        <span style={styles.categoryBadge}>{product.category}</span>
      </div>

      <div style={styles.badgeRow}>
        <span
          style={{
            ...styles.stockBadge,
            backgroundColor: stockBadge.bg,
            color: stockBadge.color,
          }}
        >
          ● {stockBadge.label}
        </span>
      </div>

      <div style={styles.details}>
        <div style={styles.detailRow}>
          <span style={styles.detailLabel}>Price:</span>
          <span style={styles.priceValue}>${Number(product.price).toFixed(2)}</span>
        </div>

        <div style={styles.detailRow}>
          <span style={styles.detailLabel}>Available Stock:</span>
          <span style={styles.stockValue}>{quantity} units</span>
        </div>

        {product.supplier && (
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>Supplier:</span>
            <span style={styles.supplierValue}>{product.supplier}</span>
          </div>
        )}
      </div>

      {role === "admin" && (
        <div style={styles.adminSection}>
          <div style={styles.stockStepper}>
            <span style={styles.stepperLabel}>Quick Stock:</span>
            <div style={styles.stepperControls}>
              <button
                type="button"
                onClick={() => onStockUpdate && onStockUpdate(id, Math.max(0, quantity - 1))}
                disabled={quantity === 0}
                style={styles.stepperBtn}
                title="Decrease stock by 1"
              >
                −
              </button>
              <span style={styles.stepperCount}>{quantity}</span>
              <button
                type="button"
                onClick={() => onStockUpdate && onStockUpdate(id, quantity + 1)}
                style={styles.stepperBtn}
                title="Increase stock by 1"
              >
                +
              </button>
            </div>
          </div>

          <div style={styles.actions}>
            <Link to={`/edit-product/${id}`} style={styles.editBtn}>
              Edit Product
            </Link>
            {onDelete && (
              <button
                type="button"
                onClick={() => onDelete(id)}
                style={styles.deleteBtn}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    transition: "transform 0.15s ease, box-shadow 0.15s ease",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "8px",
  },
  title: {
    margin: 0,
    fontSize: "17px",
    fontWeight: "600",
    color: "#0f172a",
    lineHeight: "1.3",
  },
  categoryBadge: {
    backgroundColor: "#e0f2fe",
    color: "#0369a1",
    fontSize: "11px",
    padding: "3px 8px",
    borderRadius: "12px",
    fontWeight: "600",
    whiteSpace: "nowrap",
  },
  badgeRow: {
    display: "flex",
    alignItems: "center",
  },
  stockBadge: {
    fontSize: "12px",
    padding: "3px 10px",
    borderRadius: "20px",
    fontWeight: "600",
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
  },
  details: {
    fontSize: "14px",
    color: "#475569",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    backgroundColor: "#f8fafc",
    padding: "12px",
    borderRadius: "8px",
  },
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailLabel: {
    color: "#64748b",
    fontSize: "13px",
  },
  priceValue: {
    fontWeight: "700",
    color: "#0f172a",
    fontSize: "15px",
  },
  stockValue: {
    fontWeight: "600",
    color: "#334155",
  },
  supplierValue: {
    fontWeight: "500",
    color: "#475569",
  },
  adminSection: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "4px",
    borderTop: "1px solid #f1f5f9",
    paddingTop: "12px",
  },
  stockStepper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  stepperLabel: {
    fontSize: "13px",
    fontWeight: "500",
    color: "#475569",
  },
  stepperControls: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  stepperBtn: {
    width: "28px",
    height: "28px",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
    backgroundColor: "#ffffff",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#334155",
  },
  stepperCount: {
    fontSize: "14px",
    fontWeight: "600",
    minWidth: "24px",
    textAlign: "center",
  },
  actions: {
    display: "flex",
    gap: "8px",
  },
  editBtn: {
    flex: 1,
    textAlign: "center",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    padding: "8px",
    borderRadius: "6px",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: "500",
  },
  deleteBtn: {
    backgroundColor: "#ef4444",
    color: "#ffffff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
  },
};
