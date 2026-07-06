const mongoose = require("mongoose");
//kryptera lösen med bcrypt

//user
const menuSchema = new mongoose.Schema({
    category: String,
    name: String,
    description: String,
    price: Number
});



//lägg till sak i menyn


//uppdatera sak i menyn


//ta bort sak från menyn


const Menu = mongoose.model("Menu", userSchema);
module.exports = Menu;
