const mongoose = require("mongoose");

const CarTypeSchema = mongoose.Schema({
    carModel_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Car Model is required"],
    },
    name: {
        type: String,
        required: [true, "Car Type name is required"],
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
CarTypeSchema.virtual("carModel", { //add another field with this name
    ref: "CarModelModel", // Foreign collection model
    localField: "carModel_id", // Connection local field
    foreignField: "_id", // Connection remote field
    justOne: true // Create "author" field as a single object rather than array.
});

const CarTypeModel = mongoose.model("CarTypeModel", CarTypeSchema, "carType");
module.exports = CarTypeModel;