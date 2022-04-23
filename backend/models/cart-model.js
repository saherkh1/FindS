const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: [true, "user id required"]
    },
    createDate: {
        type: Date,
        required: [true, "cart date required"],
        default: Date.now
    },
    cartProduct_id:{
        type:mongoose.Schema.Types.ObjectId,
        require: [true, "Cart product required"]
    }
},
    {
        versionKey: false,
        toJSON: { virtuals: true }, id: false
    });
CartSchema.virtual("cartProducts", {
    ref: "CartProductModel",
    localField: "cartProduct_id",
    foreignField: "_id",
    justOne: false
});

const CartModel = mongoose.model("CartModel", CartSchema, "Carts");

module.exports = CartModel;