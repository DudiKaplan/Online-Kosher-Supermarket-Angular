const express = require("express");
const ordersLogic = require("../bll/orders-logic");
const router = express.Router();


// POST http://localhost:3000/api/orders
router.post("/", async (request, response) => {
    try {
        const order = await ordersLogic.addOrder(request.body);
        response.status(201).json(order);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// GET http://localhost:3000/api/orders/count
router.get("/count", async (request, response) => {
    try {
        const count = await ordersLogic.getOrdersCount();
        response.status(201).json(count);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;