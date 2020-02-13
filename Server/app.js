const express = require("express");
const server = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const usersController = require("./controllers/users-controller");
const productsController = require("./controllers/products-controller");
const cartsController = require("./controllers/carts-controller");
const ordersController = require("./controllers/orders-controller");

server.use(cors());
server.use(express.json());
server.use(express.static(__dirname));
server.use(fileUpload());
server.use("/api/users", usersController);
server.use("/api/products", productsController);
server.use("/api/carts", cartsController);
server.use("/api/orders", ordersController);


server.listen(3000, () => console.log("Listening on http://localhost:3000"));