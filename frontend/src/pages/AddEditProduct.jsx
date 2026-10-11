import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

  useEffect(() => {
    if (!isEditing) return;

    API.get(`/products/${id}`)
      .then((response) => {
        const product = response.data.product || response.data;
        setName(product.name || "");
        setCategory(product.category || "");
        setPrice(product.price ?? "");
        setQuantity(product.quantity ?? "");
        setSupplier(product.supplier || "");
      })
      .catch(() => setError("Could not load this product."));
  }, [id, isEditing]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const product = {
      name,
      category,
      price: Number(price),
      quantity: Number(quantity),
      supplier,
    };

    try {
      if (isEditing) {
        await API.put(`/products/${id}`, product);
      } else {
        await API.post("/products", product);
      }

      navigate("/products");
    } catch (err) {
      setError(err.response?.data?.message || "Could not save product.");
    }
  }

  return (
    <div style={styles.container}>
      <h2>{isEditing ? "Edit Product" : "Add Product"}</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Price"
          min="0"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Quantity"
          min="0"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Supplier"
          value={supplier}
          onChange={(e) => setSupplier(e.target.value)}
          required
        />

        <button type="submit" style={styles.button}>
          {isEditing ? "Update Product" : "Save Product"}
        </button>
      </form>

      {error && <p style={{ color: "red", marginTop: "12px" }}>{error}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "40px auto",
    padding: "24px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "20px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "500",
  },
};
