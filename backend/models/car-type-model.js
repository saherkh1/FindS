const mongoose = require("mongoose");

const CarTypeSchema = mongoose.Schema({
    carModel_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Product Category required"],
    },
    name: {
        type: string,
        required: [true, "Car Type name required"],
    },
    year: {
        type: Number,
        required: [true, "Car year required"],
    }
},
    {
        versionKey: false,
        toJSON: { virtuals: true }
        , id: false
    });
ProductSchema.virtual("carModel", { //add another field with this name
    ref: "CarModelModel", // Foreign collection model
    localField: "carModel_id", // Connection local field
    foreignField: "_id", // Connection remote field
    justOne: true // Create "author" field as a single object rather than array.
});

const CarTypeModel = mongoose.model("CarTypeModel", CarTypeSchema, "carType");
module.exports = CarTypeModel;