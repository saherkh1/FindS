const mongoose = require("mongoose");
const RoleSchema = mongoose.Schema({
    name: String,
    }, { versionKey: false});
const RoleModel = mongoose.model("RoleModel", RoleSchema, "role");
module.exports = RoleModel;
