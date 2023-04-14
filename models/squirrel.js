const mongoose = require("mongoose")
const squirrelSchema = mongoose.Schema({
    squirrel_color: String,
    squirrel_breed: String,
    squirrel_price: Number
})
module.exports = mongoose.model("squirrel",squirrelSchema)