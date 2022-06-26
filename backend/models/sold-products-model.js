const mongoose = require("mongoose");

const SoldProductsSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: [true, "user id required"]
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: [true, "product id required"]
    },
    soledDate: {
        type: Date,
        required: [true, "cart date required"],
        default: Date.now
    },
    quantity: {
        type: Number,
        required: [true, "quantity required"],
    },
    totalPrice:{
        type: Number,
        required: [true, "Total price required"]
    }
},
    {
        versionKey: false,
        toJSON: { virtuals: true }, id: false
    });
SoldProductsSchema.virtual("product", {
    ref: "ProductModel",
    localField: "product_id",
    foreignField: "_id",
    justOne: true
});


const SoldProductsModel = mongoose.model("SoldProductsModel", SoldProductsSchema, "soldProducts");

module.exports = SoldProductsModel;