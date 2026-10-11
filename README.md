# 📦 Inventory Management System

A production-grade, full-stack **Inventory Management System** built with **React (Vite)**, **Node.js**, **Express**, and **MongoDB Atlas**. The application provides complete product lifecycle management, real-time inventory metrics, live search and category filtering, and role-based access control (**Admin** vs. **User**).

---

## 👥 Team Members

- **Rituraj Sinha** (Team Lead)
- **Priyanka** (Teammate)

---

## 📋 Project Description

The Inventory Management System allows warehouse managers and staff to manage product catalogs, track stock counts in real time, and monitor inventory valuations. It enforces strict **Role-Based Access Control (RBAC)** to ensure only authorized administrators can modify catalog data, while registered users can view and search products.

---

## ✨ Features

- **Authentication & Security:**
  - Secure registration and login using **JWT (JSON Web Tokens)** and **bcryptjs** password hashing.
  - Auto-attaching Bearer token via Axios request interceptors.
- **Role-Based Access Control (RBAC):**
  - **Admin:** Add new products, update product details, delete items, quick stock count adjustment (+ / -), and view complete inventory.
  - **User:** Read-only access to view product inventory and live search/filter items.
  - **Route Protection:** Unauthenticated users are redirected to `/login`. Admin-only pages enforce 403 Access Denied guards.
- **Inventory Analytics Dashboard:**
  - Real-time counters for **Total Products**, **Total Units in Stock**, **Inventory Valuation ($)**, and **Low Stock Alerts ($\le 5$ units)**.
- **Live Search & Multi-Criteria Filtering:**
  - Instant search by **Product Name** or **Supplier**.
  - Dynamic **Category Filter** dropdown.
  - **Stock Status Filter:** Filter by *In Stock (> 5)*, *Low Stock (1–5)*, or *Out of Stock (0)*.
- **Quick Stock Adjustment:**
  - Inline `+` / `−` steppers for Admins directly on product cards (`PATCH /api/products/:id/stock`).

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, React Router v7 (`react-router-dom`), Axios, Context API (`AuthContext`), Vanilla CSS.
- **Backend:** Node.js, Express.js, MongoDB Atlas, Mongoose ODM, JWT (`jsonwebtoken`), bcryptjs, CORS, Dotenv.
- **Workflow & Deployment:** Git & GitHub (Branch + PR workflow), Vercel (Frontend), Render/Railway (Backend).

---

## 🌐 API Endpoints & Role-Based Middleware

### **Role-Based Middleware**
- `authenticateUser`: Validates the JWT token in `Authorization: Bearer <token>` header.
- `requireAdmin`: Ensures `req.user.role === 'admin'`.

### **Endpoint Specifications**

#### **Authentication**
```text
POST   /api/auth/register    → Public (Register user with role: admin/user)
POST   /api/auth/login       → Public (Login & receive JWT token)
```

#### **Products (CRUD & Stock)**
```text
GET    /api/products            → Admin / User (authenticateUser)
GET    /api/products/:id        → Admin / User (authenticateUser)
POST   /api/products            → Admin Only   (authenticateUser + requireAdmin)
PUT    /api/products/:id        → Admin Only   (authenticateUser + requireAdmin)
PATCH  /api/products/:id/stock  → Admin Only   (authenticateUser + requireAdmin)
DELETE /api/products/:id        → Admin Only   (authenticateUser + requireAdmin)
```

#### **System Health**
```text
GET    /api/health              → Public (Server status check)
```

---

## 📁 Repository Structure

```text
Inventory-Management-System/
├── backend/
│   ├── src/
│   │   ├── config/           # MongoDB Atlas connection (db.js)
│   │   ├── controllers/      # authController.js, productController.js
│   │   ├── middleware/       # authMiddleware.js, errorMiddleware.js
│   │   ├── models/           # User.js, Product.js
│   │   ├── routes/           # authRoutes.js, productRoutes.js
│   │   └── server.js         # Express server entrypoint
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/       # Navbar.jsx, ProductCard.jsx, ProtectedRoute.jsx
│   │   ├── context/          # AuthContext.jsx
│   │   ├── hooks/            # useAuth.js
│   │   ├── pages/            # Home, Login, Register, Products, AddEditProduct
│   │   ├── services/         # api.js
│   │   ├── App.jsx           # Routes & AuthProvider
│   │   └── main.jsx
│   ├── vercel.json           # Client-side SPA route rewrites
│   ├── .env.example
│   └── package.json
├── AI_USAGE.md               # AI disclosure & verification guidelines
├── CONTRIBUTING.md           # Contribution workflow
├── LICENSE                   # MIT License
├── README.md                 # Project documentation (this file)
└── RULES.md                  # Project architectural rules
```

---

## ⚙️ Environment Variables

### **Backend (`backend/.env`)**
```env
PORT=5001
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
```

### **Frontend (`frontend/.env`)**
```env
VITE_API_URL=http://localhost:5001/api
```

> **Security Rule:** `.env` files must **NEVER** be committed to GitHub. Only `.env.example` templates are tracked.

---

## 🚀 Setup & Installation Instructions

### 1. Clone the repository
```bash
git clone https://github.com/Riturajsinha04/Inventory-Management-System.git
cd Inventory-Management-System
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Configure MONGO_URI and JWT_SECRET in backend/.env
npm run dev
```
Backend runs on `http://localhost:5001`.

### 3. Frontend Setup
In a new terminal:
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
Frontend runs on `http://localhost:5173`.

---

## 🧪 Quality Verification

```bash
cd frontend
npm run lint
npm run build
```

---

## 📸 Screenshots

*(Add placeholders/screenshots here)*

---

## 🔗 Deployment Links

- **Frontend (Vercel):** *[Link Pending]*
- **Backend (Render/Railway):** *[Link Pending]*
- **GitHub Repository URL:** [https://github.com/Riturajsinha04/Inventory-Management-System](https://github.com/Riturajsinha04/Inventory-Management-System)

---

## 📖 Project Documentation

- [Contributing Guide](./CONTRIBUTING.md)
- [Project Rules](./RULES.md)
- [AI Usage Policy](./AI_USAGE.md)

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).
