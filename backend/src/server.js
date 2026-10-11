import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Root & Health check
app.get("/", (req, res) => {
    res.json({
        message: "Inventory Management System API is running",
        status: "online",
        health: "/api/health",
        endpoints: {
            auth: "/api/auth",
            products: "/api/products",
        },
    });
});

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    console.log("DB Connected");
    app.listen(PORT, () => console.log(`Server on ${PORT}`));
});
