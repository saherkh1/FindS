const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    cityId: mongoose.Schema.Types.ObjectId,
    firstName: {
        type: String,
        required: [true, "Missing first name."]
    },
    lastName: {
        type: String,
        required: [true, "Missing last name."]
    },
    email: {
        type: String,
        required: [true, "Missing email."],
        validate: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        unique: true
    },
    idNumber: {
        type: String,
        null: false,
        required: [true, "Missing id number."],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Missing Password."],
        select: false
    },
    street: {
        type: String,
        required: [true, "Missing street."]
    },
    verified: Boolean,
    token: String
},
    {
        versionKey: false,
        toJSON: {
            virtuals: true
        }
        , id: false
    });
UserSchema.virtual("city", {
    ref: "CityModel",
    localField: "cityId",
    foreignField: "_id",
    justOne: true
});
UserSchema.virtual("role", {
    ref: "RoleModel",
    localField: "role_id",
    foreignField: "_id",
    justOne: true
});
UserSchema.virtual("carType", {
    ref: "CarTypeModel",
    localField: "carType_id",
    foreignField: "_id",
    justOne: false
});
const UserModel = mongoose.model("UserModel", UserSchema, "users");

module.exports = UserModel;