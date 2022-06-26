const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    productCategory_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Product Category is required"],
    },
    carType_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Car Type is required"],
    },
    stockQuantity: {
        type: Number,
        required: [true, "Product quantity is required"],
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
    }, 
     name: {
        type: String,
        require: [true, "Product name required"]
    },
    image: {
        type: String,
        required: [true, "Product image is required"],
    }
},
    {
        versionKey: false,
        toJSON: { virtuals: true }
        , id: false
    });
//TODO: stockQuantity must be a real number bigger than 0 
ProductSchema.virtual("category", { //add another field with this name
    ref: "ProductCategoryModel", // Foreign collection model
    localField: "productCategory_id", // Connection local field
    foreignField: "_id", // Connection remote field
    justOne: true // Create "author" field as a single object rather than array.
});
ProductSchema.virtual("carType", { //add another field with this name
    ref: "CarTypeModel", // Foreign collection model
    localField: "carType_id", // Connection local field
    foreignField: "_id", // Connection remote field
    justOne: true // Create "author" field as a single object rather than array.
});

const ProductModel = mongoose.model("ProductModel", ProductSchema, "products");

module.exports = ProductModel;