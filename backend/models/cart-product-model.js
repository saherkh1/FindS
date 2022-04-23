const mongoose = require("mongoose");

const CartProductSchema = mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "productId required"],

    },
    cart_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "cartId required"],

    },
    quantity: {
        type: Number,
        required: [true, "Quantity required"],
        default: 1
    },
    totalPrice: {
        type: Number,
        required: [true, "total price required"],
    },
},
    {
        versionKey: false,
        toJSON: { virtuals: true }, id: false
    });
CartProductSchema.virtual("product", {
    ref: "ProductModel",
    localField: "product_id",
    foreignField: "_id",
    justOne: true
});
//we are not adding a new field of the cart

const CartProductModel = mongoose.model("CartProductModel", CartProductSchema, "CartProducts");

module.exports = CartProductModel;