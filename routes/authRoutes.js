//initiera
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
router.use(express.json());


//modeller
const User = require("../models/User");


//lägg till användare
router.post("/register", async (req, res) => {
    
    try {
        //användareinfo som ska lagras
        const { username, password } = req.body;

        //validera input
        if(!username || !password) {
            return res.status(400).json({ error: "Alla fält behöver vara ifyllda" });
        }

        if(password.length < 8) {
            return res.status(400).json({ error: "Lösenordet behöver innehålla minst 8 tecken" });
        }

        const existingUser = await User.findOne({ username });

        if(existingUser) {
            return res.status(400).json({ error: "Användarnamnet är upptaget, välj ett annat" });
        }

        //spara användaren om allt stämmer
        const user = new User({ username, password });

        await user.save();

        res.status(201).json({ message: "Ny användare skapad" });

    } catch(error) {

        res.status(500).json({ error: "Server error" });
    }
});


//logga in användare
router.post("/signin", async (req, res) => {
    
    try {
        //användarinfo som ska användas vid inloggning
        const { username, password } = req.body;

        //validera input
        if(!username || !password) {
            return res.status(400).json({ error: "Alla fält behöver vara ifyllda" });
        }


        //validera användaren
        const user = await User.findOne({ username });

        if(!user) {
            return res.status(401).json({ error: "Anvädnarnamnet eller lösenordet är felaktigt" });
        }


        //validera lösenord
        const correctPassword = await user.comparePassword(password);

        if(!correctPassword) {

            return res.status(401).json({ error: "Anvädnarnamnet eller lösenordet är felaktigt" });
        } else {

            //skapa JWT
            const payload = {
                id: user.id,
                username: user.username,
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "4h" });
            console.log("token: ", token); //TA BORT SEN

            const response = {
                message: `${username} är inloggad`,
                token: token
            };

            res.status(200).json(response);
        }

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});





module.exports = router;