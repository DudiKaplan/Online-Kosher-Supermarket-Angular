const Cart = require("../models/cart");
const ItemCart = require("../models/itemCart");


//create new cart to mongoDB
function createCart(cart) {
    return new Promise((resolve, reject) => {
        const newCart = new Cart(cart);
        newCart.save((err, addedCart) => {
            if (err) return reject(err);
            resolve(addedCart);
        });
    });
};

//Add new item cart to mongoDB
function addItemCart(item) {
    return new Promise((resolve, reject) => {
        const newItem = new ItemCart(item);
        newItem.save((err, addedItem) => {
            if (err) return reject(err);
            resolve(addedItem);
        });
    });
};

// Delete one Item Cart: 
function deleteItemCart(_id) {
    return new Promise((resolve, reject) => {
        ItemCart.deleteOne({ _id }, (err, info) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
};

// Delete all Items Cart: 
function deleteAllItemCart(cart) {
    return new Promise((resolve, reject) => {
        ItemCart.deleteMany({ cart }, (err, info) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
};

//update order is close on this cart
function updateCartStatus(_id) {
    return new Promise((resolve, reject) => {
        Cart.updateOne({ _id }, { isOrder: true }, (err, info) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
};

//Get cart by user id in carts collection
function getCartsByUserId(_id) {
    return new Promise((resolve, reject) => {
        Cart.find({ "user": _id }, (err, carts) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(carts);
        });
    });
};

function getItemsCartPerCart(_id) {
    return new Promise((resolve, reject) => {
        ItemCart.find({ cart: _id }).populate("product").exec((err, itemsCart) => {
            if (err) return reject(err);
            resolve(itemsCart);
        });
    });
};

module.exports = {
    createCart,
    addItemCart,
    deleteItemCart,
    deleteAllItemCart,
    updateCartStatus,
    getCartsByUserId,
    getItemsCartPerCart
};