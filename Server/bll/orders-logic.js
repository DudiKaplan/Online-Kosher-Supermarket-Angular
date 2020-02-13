const Order = require("../models/order");


//Add new corder to mongoDB
function addOrder(order) {
    return new Promise((resolve, reject) => {
        const newOrder = new Order(order);
        newOrder.save((err, addedOrder) => {
            if (err) return reject(err);
            resolve(addedOrder);
        });
    });
};

//Get orders count
function getOrdersCount() {
    return new Promise((resolve, reject) => {
        Order.countDocuments({}, (err, count) => {
            if (err) return reject(err);
            resolve(count)
        })
    })
};

module.exports = {
    addOrder,
    getOrdersCount
};