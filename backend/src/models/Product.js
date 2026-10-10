
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "product name is required"],
            trim: true,
        },
        category: {
            type: String,
            required: [true, "category is required"],
            trim: true,
        },
        price: {
            type: Number,
            required: [true, "price is required"],
            min: [0, "price cannot be negative"],
        },
        quantity: {
            type: Number,
            required: [true, "quantity is required"],
            min: [0, "quantity cannot be negative"],
            default: 0,
        },
        supplier: {
            type: String,
            required: [true, "supplier is required"],
            trim: true,
        },
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
