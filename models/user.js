const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//user
const userSchema = new mongoose.Schema({
    username: {
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
userSchema.pre("save", async function(next) {

    try{
        //är lösenordet nytt eller ändrat?
        if(this.isNew || this.isModified("password")) {
            const cryptPassword = await bcrypt.hash(this.password, 8);

            this.password = cryptPassword;
        };

        next();

    } catch(error) {

        next(error);
    }
});

//lägg till användare
userSchema.statics.register = async function  (username, password) {

    try {
        const user = new this({ username, password });

        await user.save();

        return user;

    } catch(error) {
        
        throw error;
    }
    
};


//jämför skrivna lösen med det krypterade lösenordet
userSchema.methods.comparePassword = async function(password) {

    try {
        
        return await bcrypt.compare(password, this.password);

    } catch(error) {

        throw error;
    }
};


//logga in användare
userSchema.statics.login = async function(username, password) {

    try {
        //kollar om användarnamnet eller lösenordet är fel
        const user = await this.findOne({ username });

        //skriver inte ut om det är användarnamnet eller lösenordet som är fel pga säkerhet
        if(!user) {
            throw new Error("Anvädnarnamnet eller lösenordet är felaktigt"); 
        }

        const correctPassword = await user.comparePassword(password);

        //skriver inte ut om det är användarnamnet eller lösenordet som är fel pga säkerhet
        if(!correctPassword) {
            throw new Error("Anvädnarnamnet eller lösenordet är felaktigt"); 
        }

        return user;

    } catch(error) {

        throw error;
    }
}


const User = mongoose.model("User", userSchema);
module.exports = User;
