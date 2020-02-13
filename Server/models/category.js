const mongoose = require("../dal/dal");

const categorySchema = mongoose.Schema({
    name: String
}, { versionKey: false });

const Category = mongoose.model("Category", categorySchema, "Categories");

module.exports = Category;