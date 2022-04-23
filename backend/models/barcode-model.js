const mongoose = require("mongoose");

const BarcodeSchema = mongoose.Schema({
    carType_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Product Category required"],
    },
    name: {
        type: String,
        required: [true, "Barcode name required"],
    },
    image: String
},
    {
        versionKey: false,
        toJSON: { virtuals: true }
        , id: false
    });
    BarcodeSchema.virtual("carType", { //add another field with this name
    ref: "CarTypeModel", // Foreign collection model
    localField: "carType_id", // Connection local field
    foreignField: "_id", // Connection remote field
    justOne: true // Create "author" field as a single object rather than array.
});


const BarcodeModel = mongoose.model("BarcodeModel", BarcodeSchema, "barcodes");
module.exports = BarcodeModel;