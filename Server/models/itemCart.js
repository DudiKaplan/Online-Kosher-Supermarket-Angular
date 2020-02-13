const mongoose = require("../dal/dal");

const itemCartSchema = mongoose.Schema({
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart"
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    amount: {
        type: Number,
        required: true,
        min: 1
    },
    generalPrice: {
        type: Number,
        required: true,
        min: 1
    },
    creationDate: Date,
}, { versionKey: false });

const ItemCart = mongoose.model("ItemCart", itemCartSchema, "ItemsCart");

module.exports = ItemCart;