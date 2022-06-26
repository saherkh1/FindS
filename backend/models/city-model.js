const mongoose = require("mongoose");
const CitySchema = mongoose.Schema({
    name: String,
}, { versionKey: false });
const CityModel = mongoose.model("CityModel", CitySchema, "City");
module.exports = CityModel;
