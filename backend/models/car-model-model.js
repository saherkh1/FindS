const mongoose = require("mongoose");
const CarModelSchema = mongoose.Schema({
    name: String,
    }, { versionKey: false});
const CarModelModel = mongoose.model("CarModelModel", CarModelSchema, "CarModel");
module.exports = CarModelModel;
