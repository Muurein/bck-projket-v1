const mongoose = require("mongoose");
//kryptera lösen med bcrypt

//user
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
});


//kryptera lösen


//lägg till användare



//jämför skrivna lösen med det krypterade lösenordet


//logga in användare


const User = mongoose.model("User", userSchema);
module.exports = User;
