import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

export default function AddEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [supplier, setSupplier] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isEditing) return;

    API.get(`/products/${id}`)
      .then((response) => {
        const product = response.data.product || response.data;
        setName(product.name || "");
        setCategory(product.category || "");
        setPrice(product.price !== undefined ? product.price : "");
        setQuantity(product.quantity !== undefined ? product.quantity : "");
        setSupplier(product.supplier || "");
      })
      .catch(() => setError("Could not load product details."));
  }, [id, isEditing]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const productPayload = {
      name: name.trim(),
      category: category.trim(),
      price: Number(price),
      quantity: parseInt(quantity, 10),
      supplier: supplier.trim(),
    };

    try {
      if (isEditing) {
        await API.put(`/products/${id}`, productPayload);
      } else {
        await API.post("/products", productPayload);
      }

      navigate("/products");
    } catch (err) {
      setError(err.response?.data?.message || "Could not save product.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>{isEditing ? "Edit Product" : "Add New Product"}</h2>
          <p style={styles.subtitle}>
            {isEditing
              ? "Update product specifications and inventory stock."
              : "Enter item details to register a new product in the catalog."}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Product Name *</label>
            <input
              type="text"
              placeholder="e.g. Wireless Mouse"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Category *</label>
            <input
              type="text"
              placeholder="e.g. Electronics, Furniture, Office"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.twoCol}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Unit Price ($) *</label>
              <input
                type="number"
                placeholder="29.99"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Initial Stock Quantity *</label>
              <input
                type="number"
                placeholder="10"
                min="0"
                step="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Supplier Name</label>
            <input
              type="text"
              placeholder="e.g. TechCorp Logistics"
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.btnRow}>
            <button type="submit" disabled={loading} style={styles.saveBtn}>
              {loading
                ? "Saving..."
                : isEditing
                ? "Update Product"
                : "Create Product"}
            </button>
            <Link to="/products" style={styles.cancelBtn}>
              Cancel
            </Link>
          </div>
        </form>

        {error && <div style={styles.errorBox}>{error}</div>}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px 20px",
    display: "flex",
    justifyContent: "center",
  },
  card: {
    maxWidth: "540px",
    width: "100%",
    backgroundColor: "#ffffff",
    padding: "36px",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
  },
  header: {
    marginBottom: "24px",
  },
  title: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "700",
    color: "#0f172a",
  },
  subtitle: {
    margin: "4px 0 0 0",
    fontSize: "14px",
    color: "#64748b",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    flex: 1,
  },
  twoCol: {
    display: "flex",
    gap: "16px",
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
  btnRow: {
    display: "flex",
    gap: "12px",
    marginTop: "12px",
  },
  saveBtn: {
    flex: 1,
    padding: "11px",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
  },
  cancelBtn: {
    padding: "11px 20px",
    backgroundColor: "#f1f5f9",
    color: "#475569",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    textDecoration: "none",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: "500",
  },
  errorBox: {
    marginTop: "20px",
    padding: "12px",
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
    borderRadius: "6px",
    fontSize: "13px",
  },
};
