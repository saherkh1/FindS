const UserModel = require("../models/user-model");
const cryptoHelper = require("../helpers/crypto-helper");

function isDuplicateUserAsync(user) {
    let tempUser = user
    delete tempUser.password
    return UserModel.find({ ...tempUser }).exec();
}

async function registerFirstStepAsync(user) {
    user.password = cryptoHelper.hash(user.password);
    const newUser = await UserModel.collection.insertOne({
        email: user.email,
        password: user.password,
        idNumber: user.idNumber,
        role: "Client",
        verified: false,
    });
    const returnedUser = await UserModel.findById(newUser.insertedId).exec();
    returnedUser.token = cryptoHelper.getNewToken(user);
    return returnedUser;
}

async function registerSecondStepAsync(user) {
    user.verified = true;
    const id = user._id;
    const loggedUser = await UserModel.findByIdAndUpdate(id, user,
        { returnOriginal: false }
    ).exec().catch(reason => console.log(reason));
    loggedUser.token = cryptoHelper.getNewToken(user);
    console.log("here two")
    return loggedUser;
}

async function loginAsync(credentials) {
    try {
        const email = credentials.email;
        const password = cryptoHelper.hash(credentials.password);
        const loggedInUser = await UserModel.findOne({ email, password }).exec();
        loggedInUser.token = cryptoHelper.getNewToken(loggedInUser);
        return loggedInUser;
    } catch (err) {
        console.error(err)
    }
}
module.exports = {
    loginAsync,
    isDuplicateUserAsync,
    registerFirstStepAsync,
    registerSecondStepAsync
}