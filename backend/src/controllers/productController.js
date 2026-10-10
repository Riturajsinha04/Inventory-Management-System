
import Product from "../models/Product.js";

// YE NYA PRODUCT ADD KR RHA H 
export const createProduct = async (req, res, next) => {
    try {
        const product = new Product(req.body);
        await product.save();

        res.status(201).json({
            message: "product added successfully",
            product: product,
        });
    } catch (error) {
        next(error);
    }
};

// YE PRODUCT SHOW KREGA 
export const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find();

        res.status(200).json({
            message: "products fetched successfully",
            products: products,
        });
    } catch (error) {
        next(error);
    }
};

// YE VALI ID USE KRKE EK PRODUCT SHOW KREGA
export const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "product not found",
            });
        }

        res.status(200).json({
            product: product,
        });
    } catch (error) {
        next(error);
    }
};

// PRODUCT KI DETAILS KO USE KRKE 
export const updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({
                message: "product not found",
            });
        }

        res.status(200).json({
            message: "product updated successfully",
            product: product,
        });
    } catch (error) {
        next(error);
    }
};

//  PROCUT KO DELAETE KRDEGA
export const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "product not found",
            });
        }

        res.status(200).json({
            message: "product deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

// UPDATE KREGA PRODUCT KI QUANTITY
export const updateStock = async (req, res, next) => {
    try {
        const quantity = req.body.quantity;

        if (!Number.isInteger(quantity) || quantity < 0) {
            return res.status(400).json({
                message: "quantity must be a non-negative integer",
            });
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { quantity: quantity },
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({
                message: "product not found",
            });
        }

        res.status(200).json({
            message: "stock updated successfully",
            product: product,
        });
    } catch (error) {
        next(error);
    }
};
