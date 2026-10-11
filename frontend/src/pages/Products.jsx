import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import { useAuth } from "../context/AuthContext";

export default function Products() {
  const { role } = useAuth();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function fetchProducts() {
      try {
        const response = await API.get("/products");
        if (!ignore) {
          const data = response.data;
          setProducts(Array.isArray(data) ? data : data.products || []);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.response?.data?.message || "Could not load products.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => {
      ignore = true;
    };
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await API.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => (p._id || p.id) !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete product.");
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Product Inventory</h2>
        {role === "admin" && (
          <Link to="/add-product" style={styles.addBtn}>+ Add Product</Link>
        )}
      </div>

      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && products.length === 0 && (
        <p>No products found in the inventory.</p>
      )}

      <div style={styles.grid}>
        {products.map((product) => (
          <ProductCard
            key={product._id || product.id}
            product={product}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "32px 24px",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: "24px",
  },
  addBtn: {
    backgroundColor: "#2563eb",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "500",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
  },
};
