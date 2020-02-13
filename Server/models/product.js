const mongoose = require("../dal/dal");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
        trim: true,
        lowercase: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    price: {
        type: Number,
        required: true,
        min: 1
    },
    imageName: {
        type: String,
        trim: true,
    }

}, { versionKey: false });

const Product = mongoose.model("Product", productSchema, "Products");

module.exports = Product;