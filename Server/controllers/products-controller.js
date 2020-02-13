const express = require("express");
const productsLogic = require("../bll/products-logic");
const router = express.Router();
const uuid = require("uuid/v4");
const fs = require("fs");

// POST http://localhost:3000/api/products
router.post("/", async (request, response) => {
    try {
        if (!request.files) {
            response.status(400).send("No image sent!");
            return;
        }
        const body = JSON.parse(request.body.json);
        const file = request.files.selection;
        body.imageName = saveFile(file);
        const product = await productsLogic.addProduct(body);
        response.status(201).json(product);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// GET http://localhost:3000/api/products/per-category/:_id
router.get("/per-category/:_id", async (request, response) => {
    try {
        products = await productsLogic.getProductsPerCategory(request.params._id);
        response.status(201).json(products);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// GET http://localhost:3000/api/products/categories
router.get("/categories", async (request, response) => {
    try {
        const categories = await productsLogic.getAllCategories();
        response.json(categories);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// PATCH http://localhost:3000/api/products
router.patch("/:_id", async (request, response) => {
    try {
        const product = JSON.parse(request.body.json);

        if (request.files) {
            const file = request.files.selection;
            deleteFile(product.imageName);
            product.imageName = saveFile(file);
        }
        const updatedProduct = await productsLogic.updateProduct(request.params._id, product);
        response.json(updatedProduct);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


// GET http://localhost:3000/api/products/product-by-name/:keyword
router.get("/product-by-name/:keyword", async (request, response) => {
    try {
        const name = request.params.keyword;
        const prodcts = await productsLogic.getProductByName(name);
        response.json(prodcts);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// GET http://localhost:3000/api/products/count
router.get("/count", async (request, response) => {
    try {
        const count = await productsLogic.getProductsCount();
        response.status(201).json(count);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

//help functions------------------------------------------------------------------------------

function saveFile(file) {
    const extension = file.name.substr(file.name.lastIndexOf("."));
    const fileName = uuid() + extension;
    file.mv("./assets/images/" + fileName);
    return fileName;
};

function deleteFile(fileName) {
    const oldFile = "./assets/images/" + fileName;
    fs.unlink(oldFile, (err) => {
        if (err) {
            return err;
        };
    });
};

//------------------------------------------------------------------------------

module.exports = router;
