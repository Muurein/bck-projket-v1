const mongoose = require("mongoose");

//user
const menuSchema = new mongoose.Schema({
    category: {
        type: String,
        required: [ true, "Du behöver fylla i kategori"],
        trim: true
    },
    name: {
        type: String,
        required: [ true, "Du behöver fylla i namn"],
        trim: true
    },
    description: {
        type: String,
        required: [ true, "Du behöver fylla i beskrivning"],
        trim: true
    },
    price: {
        type: Number,
        required: [ true, "Du behöver fylla i nummer"],
        min: 1
    },
});


const Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;
