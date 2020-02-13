const mongoose = require("../dal/dal");

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart"
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 1
    },
    city: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    shippingDate: {
        type: Date,
        required: true
    },
    creditCard: {
        type: String,
        required: true
    }

}, { versionKey: false });

const Order = mongoose.model("Order", orderSchema, "Orders");

module.exports = Order;