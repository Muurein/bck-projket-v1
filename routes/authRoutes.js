//initiera
const express = require("express");
const router = express.Router();


//modeller
const User = require("../models/User");
const Menu= require("../models/Menu"); 

//lägg till användare
router.post("/register", async (req, res) => {
    console.log("Data mottagen: ", req.body);
});


//logga in användare
router.post("/signin", async (req, res) => {
    console.log("Data mottagen: ", req.body);
});


//uppdatera/ändra användare?


//ta bort användare



module.exports = router;