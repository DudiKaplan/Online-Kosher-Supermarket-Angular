const mongoose = require("../dal/dal");

const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    creationDate: Date,
    isOrder: {
        type: Boolean,
        default: false
    }
}, { versionKey: false });

const Cart = mongoose.model("Cart", cartSchema, "Carts");

module.exports = Cart;