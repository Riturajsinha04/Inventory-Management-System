import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ status: "ok" }));
// app.use("/api/auth", authRoutes);        // tomorrow (Rituraj)
// app.use("/api/products", productRoutes); // Priyanka

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
connectDB().then(() => app.listen(PORT, () => console.log(`Server on ${PORT}`)));