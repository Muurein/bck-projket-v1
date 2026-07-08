const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
router.use(express.json());

//modeller
const User = require("../models/User");

//uppdatera/ändra användare?
router.put("/updateUser/:id", async (req, res) => {

    try {
       //hämta id och korresponderade item
       const { id }= req.params;

       const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        //validering
        if(!updatedUser) {
            return res.status(404).json({ message: "Användaren hittades inte" });
        }

        res.status(200).json(updatedUser);
    } catch(error) {

        res.status(500).json({ message: "Något gick fel: " + error.message });
    }

});

//ta bort användare
router.delete("/deleteUser/:id", async (req, res) => {
    
    try {
        //hämta id och korresponderade item
        const { id } = req.params;

        const deletedItem = await User.findByIdAndDelete(id);

        //validering
        if(!deletedItem) {
            return res.status(404).json({ message: "Användaren hittades inte" });
        }

        res.status(200).json({ message: "Användaren har tagits bort" });

    } catch (error) {

        res.status(500).json({ message: "Något gick fel: " + error.message });
    }
});


module.exports = router;