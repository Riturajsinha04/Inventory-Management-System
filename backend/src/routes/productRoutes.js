
import express from "express";
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    updateStock,
} from "../controllers/productController.js";
import {
    authenticateUser,
    requireAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateUser, getProducts);
router.get("/:id", authenticateUser, getProductById);

router.post("/", authenticateUser, requireAdmin, createProduct);
router.put("/:id", authenticateUser, requireAdmin, updateProduct);
router.patch("/:id/stock", authenticateUser, requireAdmin, updateStock);
router.delete("/:id", authenticateUser, requireAdmin, deleteProduct);




export default router;