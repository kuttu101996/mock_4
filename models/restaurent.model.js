const mongoose = require("mongoose");

const menuSchema = mongoose.Schema({
        name: String,
        description: String,
        price: Number,
        image: String
})

const restaurentSchema = mongoose.Schema({
        name: String,
        address: {
          street: String,
          city: String,
          state: String,
          country: String,
          zip: String
        },
        menu: [menuSchema]      
})

const RestaurentModel = mongoose.model("restaurent", restaurentSchema)
const MenuModel = mongoose.model("menu", menuSchema);



module.exports = {
    RestaurentModel,
    MenuModel
}