const mongoose = require("mongoose");

const ReceivedProductsSchema = mongoose.Schema({
    // user_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     require: [true, "user id required"]
    // },//add if you want to log how received the product
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: [true, "product id required"]
    },
    receivedDate: {
        type: Date,
        required: [true, "cart date required"],
        default: Date.now
    },
    quantity: {
        type: Number,
        required: [true, "quantity required"],
    },
    totalBuyingPrice: {
        type: Number,
        required: [true, "Price required"]
    }
},
    {
        versionKey: false,
        toJSON: { virtuals: true }, id: false
    });
ReceivedProductsSchema.virtual("product", {
    ref: "ProductModel",
    localField: "product_id",
    foreignField: "_id",
    justOne: true
});


const ReceivedProductsModel = mongoose.model("ReceivedProductsModel", ReceivedProductsSchema, "receivedProducts");

module.exports = ReceivedProductsModel;