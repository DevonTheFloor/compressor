const mongoose = require("mongoose");

const pictureSchema = mongoose.Schema({
    name: { type: String, required: true},
    url: { type: String, required: true},
    project: { type: String}
});

module.exports = mongoose.model("Picto", pictureSchema);