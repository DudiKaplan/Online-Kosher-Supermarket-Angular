const express = require("express");
const cartsLogic = require("../bll/carts-logic");
const router = express.Router();


// POST http://localhost:3000/api/carts
router.post("/", async (request, response) => {
    try {
        const cart = await cartsLogic.createCart(request.body);
        response.status(201).json(cart);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// POST http://localhost:3000/api/carts/item-cart
router.post("/item-cart", async (request, response) => {
    try {
        const item = await cartsLogic.addItemCart(request.body);
        response.status(201).json(item);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// DELETE http://localhost:3000/api/carts/item-cart/:_id
router.delete("/item-cart/:_id", async (request, response) => {
    try {
        await cartsLogic.deleteItemCart(request.params._id);
        response.sendStatus(204);
    }
    catch(err) {
        response.status(500).send(err.message);
    }
});

// DELETE http://localhost:3000/api/carts/items-cart/:cart
router.delete("/items-cart/:cart", async (request, response) => {
    try {
        await cartsLogic.deleteAllItemCart(request.params.cart);
        response.sendStatus(204);
    }
    catch(err) {
        response.status(500).send(err.message);
    }
});

// PATCH  http://localhost:3000/api/carts/:_id
router.patch("/:_id", async (request, response) => {
    try {
        await cartsLogic.updateCartStatus(request.params._id);
        response.sendStatus(204);
    }
    catch(err) {
        response.status(500).send(err.message);
    }
});

// GET  http://localhost:3000/api/carts/by-user/_id
router.get("/by-user/:_id", async (request, response) => {
    try {
        const carts = await cartsLogic.getCartsByUserId(request.params._id);
        response.status(201).json(carts);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// GET  http://localhost:3000/api/carts/by-cart/_id
router.get("/by-cart/:_id", async (request, response) => {
    try {
        const items = await cartsLogic.getItemsCartPerCart(request.params._id);
        response.status(201).json(items);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;