const mongoose = require("mongoose")
const squirrelSchema = mongoose.Schema({
    squirrel_color: String,
    squirrel_breed: {type:String,length:15},
    squirrel_price: {type:Number,min:1000,max:10000}
})
module.exports = mongoose.model("squirrel",squirrelSchema)
