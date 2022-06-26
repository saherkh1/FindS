const mongoose = require("mongoose");

const BarcodeSchema = mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Product Category required"],
    },
    name: {
        type: String,
        required: [true, "Barcode name required"],
    }
},
    {
        versionKey: false,
        toJSON: { virtuals: true }
        , id: false
    });
BarcodeSchema.virtual("product", { //add another field with this name
    ref: "ProductModel", // Foreign collection model
    localField: "product_id", // Connection local field
    foreignField: "_id", // Connection remote field
    justOne: true // Create "author" field as a single object rather than array.
});


const BarcodeModel = mongoose.model("BarcodeModel", BarcodeSchema, "barcodes");
module.exports = BarcodeModel;