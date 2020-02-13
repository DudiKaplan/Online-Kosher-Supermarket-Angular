const Product = require("../models/product");
const Category = require("../models/category");


//Add new product to mongoDB
function addProduct(product) {
    return new Promise((resolve, reject) => {
        const productToAdd = new Product(product);
        productToAdd.save((err, addedProduct) => {
            if (err) return reject(err);
            resolve(addedProduct);
        });
    });
};

//Get all products per category from mongoDB
function getProductsPerCategory(_id) {
    return new Promise((resolve, reject) => {
        Product.find({ category: _id }).populate("category").exec((err, products) => {
            if (err) return reject(err);
            resolve(products);
        });
    });
};

//Return all categories form mongoDB
function getAllCategories() {
    return new Promise((resolve, reject) => {
        Category.find({}, (err, categories) => {
            if (err) return reject(err);
            resolve(categories);
        });
    });
};

// Update Product: 
function updateProduct(_id, product) {
    return new Promise((resolve, reject) => {
        const productToUpdate = new Product(product);
        productToUpdate._id = _id;
        Product.updateOne({ _id }, productToUpdate, (err, info) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(productToUpdate);
        });
    });
};

//Get product by name in prodcts collection
function getProductByName(name) {
    return new Promise((resolve, reject) => {
        Product.find({ "name": { $regex: '.*' + name + '.*' } }, (err, products) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(products);
        });
    });
};

//Get products count
function getProductsCount() {
    return new Promise((resolve, reject) => {
        Product.countDocuments({}, (err, count) => {
            if (err) return reject(err);
            resolve(count)
        })
    })
};

module.exports = {
    addProduct,
    getAllCategories,
    getProductsPerCategory,
    updateProduct,
    getProductByName,
    getProductsCount
};