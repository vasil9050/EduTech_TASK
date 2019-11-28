let mongoose = require("mongoose");

var addSchema = new mongoose.Schema({
    question : String
})

module.exports = mongoose.model("Add" , addSchema)