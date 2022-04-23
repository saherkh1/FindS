const mongoose = require("mongoose");
const ProductCategorySchema = mongoose.Schema({
    name: String,
}, { versionKey: false });
const ProductCategoryModel = mongoose.model("ProductCategoryModel", ProductCategorySchema, "ProductCategory");
module.exports = ProductCategoryModel;
