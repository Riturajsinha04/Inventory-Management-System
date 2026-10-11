import Product from "../models/Product.js";

// Add a new product
export const createProduct = async (req, res, next) => {
    try {
        const product = new Product(req.body);
        await product.save();

        res.status(201).json({
            message: "Product added successfully",
            product: product,
        });
    } catch (error) {
        next(error);
    }
};

// Get all products
export const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find();

        res.status(200).json({
            message: "Products fetched successfully",
            products: products,
        });
    } catch (error) {
        next(error);
    }
};

// Get single product by id
export const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.status(200).json({
            product: product,
        });
    } catch (error) {
        next(error);
    }
};

// Update product by id
export const updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.status(200).json({
            message: "Product updated successfully",
            product: product,
        });
    } catch (error) {
        next(error);
    }
};

// Delete product by id
export const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.status(200).json({
            message: "Product deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

// Update product stock quantity
export const updateStock = async (req, res, next) => {
    try {
        const quantity = req.body.quantity;

        if (!Number.isInteger(quantity) || quantity < 0) {
            return res.status(400).json({
                message: "Quantity must be a non-negative integer",
            });
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { quantity: quantity },
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.status(200).json({
            message: "Stock updated successfully",
            product: product,
        });
    } catch (error) {
        next(error);
    }
};
