const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    productCategory_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Product Category required"],
    },
    barCode_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Barcode required"],
    },
    stockQuantity: {
        type: Number,
        required: [true, "Product price required"],
    },
    price: {
        type: Number,
        required: [true, "Product price required"],
    }
},
    {
        versionKey: false,
        toJSON: { virtuals: true }
        , id: false
    });
ProductSchema.virtual("category", { //add another field with this name
    ref: "ProductCategoryModel", // Foreign collection model
    localField: "productCategory_id", // Connection local field
    foreignField: "_id", // Connection remote field
    justOne: true // Create "author" field as a single object rather than array.
});

const ProductModel = mongoose.model("ProductModel", ProductSchema, "products");

module.exports = ProductModel;