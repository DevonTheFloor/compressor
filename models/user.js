const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    pseudo  : { type: String, require : true, unique: true},
    email   : { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar  : { type: String, required: false }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);