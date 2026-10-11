import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import { useAuth } from "../context/AuthContext";

export default function Products() {
  const { role } = useAuth();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [stockFilter, setStockFilter] = useState("ALL");

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

  // Stock Quick Update handler (Admin)
  async function handleStockUpdate(id, newQuantity) {
    if (newQuantity < 0) return;
    try {
      await API.patch(`/products/${id}/stock`, { quantity: newQuantity });
      setProducts((prev) =>
        prev.map((p) =>
          (p._id || p.id) === id ? { ...p, quantity: newQuantity } : p
        )
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update stock.");
    }
  }

  // Delete product handler (Admin)
  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await API.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => (p._id || p.id) !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete product.");
    }
  }

  // Available unique categories
  const categories = useMemo(() => {
    const set = new Set();
    products.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set).sort();
  }, [products]);

  // Inventory Dashboard metrics
  const stats = useMemo(() => {
    const totalProducts = products.length;
    let totalUnits = 0;
    let totalValue = 0;
    let lowStockCount = 0;

    products.forEach((p) => {
      const qty = Number(p.quantity) || 0;
      const price = Number(p.price) || 0;
      totalUnits += qty;
      totalValue += qty * price;
      if (qty <= 5) lowStockCount += 1;
    });

    return { totalProducts, totalUnits, totalValue, lowStockCount };
  }, [products]);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search matches name or supplier
      const q = searchQuery.toLowerCase().trim();
      const nameMatches = p.name ? p.name.toLowerCase().includes(q) : false;
      const supplierMatches = p.supplier
        ? p.supplier.toLowerCase().includes(q)
        : false;
      const matchesSearch = !q || nameMatches || supplierMatches;

      // Category filter
      const matchesCategory =
        selectedCategory === "ALL" || p.category === selectedCategory;

      // Stock status filter
      const qty = Number(p.quantity) || 0;
      let matchesStock = true;
      if (stockFilter === "IN_STOCK") {
        matchesStock = qty > 5;
      } else if (stockFilter === "LOW_STOCK") {
        matchesStock = qty > 0 && qty <= 5;
      } else if (stockFilter === "OUT_OF_STOCK") {
        matchesStock = qty === 0;
      }

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [products, searchQuery, selectedCategory, stockFilter]);

  function handleResetFilters() {
    setSearchQuery("");
    setSelectedCategory("ALL");
    setStockFilter("ALL");
  }

  const isFiltered =
    searchQuery.trim() !== "" ||
    selectedCategory !== "ALL" ||
    stockFilter !== "ALL";

  return (
    <div style={styles.container}>
      {/* Top Header */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.pageTitle}>Inventory Management</h2>
          <p style={styles.pageSubtitle}>
            Manage your products and inventory
          </p>
        </div>
        {role === "admin" && (
          <Link to="/add-product" style={styles.addBtn}>
            + Add New Product
          </Link>
        )}
      </div>

      {/* Stats Dashboard Cards */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Total Products</div>
          <div style={styles.statNumber}>{stats.totalProducts}</div>
          <div style={styles.statHelp}>Unique items in catalog</div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statLabel}>Total Stock Units</div>
          <div style={styles.statNumber}>{stats.totalUnits}</div>
          <div style={styles.statHelp}>Units in warehouse</div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statLabel}>Total Inventory Value</div>
          <div style={styles.statNumber}>
            ${stats.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div style={styles.statHelp}>Based on unit price & quantity</div>
        </div>

        <div
          style={{
            ...styles.statCard,
            borderLeft: stats.lowStockCount > 0 ? "4px solid #f59e0b" : "1px solid #e2e8f0",
          }}
        >
          <div style={styles.statLabel}>Low Stock Alerts</div>
          <div
            style={{
              ...styles.statNumber,
              color: stats.lowStockCount > 0 ? "#d97706" : "#0f172a",
            }}
          >
            {stats.lowStockCount}
          </div>
          <div style={styles.statHelp}>Items with ≤ 5 units left</div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div style={styles.filterCard}>
        <div style={styles.filterGrid}>
          <div style={styles.filterItem}>
            <label style={styles.filterLabel}>Search Products</label>
            <input
              type="text"
              placeholder="Search by product name or supplier..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.filterInput}
            />
          </div>

          <div style={styles.filterItem}>
            <label style={styles.filterLabel}>Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={styles.filterSelect}
            >
              <option value="ALL">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.filterItem}>
            <label style={styles.filterLabel}>Stock Status</label>
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              style={styles.filterSelect}
            >
              <option value="ALL">All Stock Levels</option>
              <option value="IN_STOCK">In Stock (&gt; 5)</option>
              <option value="LOW_STOCK">Low Stock (1 - 5)</option>
              <option value="OUT_OF_STOCK">Out of Stock (0)</option>
            </select>
          </div>

          {isFiltered && (
            <div style={{ ...styles.filterItem, alignSelf: "flex-end" }}>
              <button
                type="button"
                onClick={handleResetFilters}
                style={styles.resetBtn}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content State Feedback */}
      {loading && <div style={styles.loadingBox}>Loading inventory items...</div>}
      {error && <div style={styles.errorBox}>{error}</div>}

      {!loading && !error && products.length === 0 && (
        <div style={styles.emptyBox}>
          <h3>No products in inventory yet</h3>
          <p>
            {role === "admin"
              ? "Click '+ Add New Product' above to create your first inventory item."
              : "No inventory items are available to display right now."}
          </p>
        </div>
      )}

      {!loading && !error && products.length > 0 && filteredProducts.length === 0 && (
        <div style={styles.emptyBox}>
          <h3>No products match your filter</h3>
          <p>Try clearing your search query or choosing another category.</p>
          <button
            type="button"
            onClick={handleResetFilters}
            style={styles.resetBtn}
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Products Grid */}
      <div style={styles.grid}>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product._id || product.id}
            product={product}
            onDelete={handleDelete}
            onStockUpdate={handleStockUpdate}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "36px 24px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "16px",
    marginBottom: "24px",
  },
  pageTitle: {
    margin: 0,
    fontSize: "26px",
    fontWeight: "700",
    color: "#0f172a",
    letterSpacing: "-0.5px",
  },
  pageSubtitle: {
    margin: "4px 0 0 0",
    color: "#64748b",
    fontSize: "14px",
  },
  addBtn: {
    backgroundColor: "#2563eb",
    color: "#ffffff",
    padding: "10px 18px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "14px",
    boxShadow: "0 2px 4px rgba(37, 99, 235, 0.2)",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
    marginBottom: "28px",
  },
  statCard: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
  },
  statLabel: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  statNumber: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#0f172a",
    margin: "8px 0 4px 0",
  },
  statHelp: {
    fontSize: "12px",
    color: "#94a3b8",
  },
  filterCard: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
    marginBottom: "28px",
  },
  filterGrid: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
    alignItems: "center",
  },
  filterItem: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    flex: "1 1 200px",
  },
  filterLabel: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#475569",
  },
  filterInput: {
    padding: "9px 12px",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
    outline: "none",
  },
  filterSelect: {
    padding: "9px 12px",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
    backgroundColor: "#ffffff",
    outline: "none",
    cursor: "pointer",
  },
  resetBtn: {
    padding: "9px 16px",
    backgroundColor: "#f1f5f9",
    color: "#475569",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
    height: "38px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
  },
  loadingBox: {
    padding: "40px",
    textAlign: "center",
    color: "#64748b",
    fontSize: "15px",
  },
  errorBox: {
    padding: "16px",
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  emptyBox: {
    backgroundColor: "#ffffff",
    padding: "48px 24px",
    textAlign: "center",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    color: "#64748b",
  },
};
