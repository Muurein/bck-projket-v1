//initiera
const express = require("express");
const router = express.Router();
console.log("menuRoutes laddades");

//modeller
const Menu = require("../models/Menu"); 


//hämta items
router.get("/getItem", async (req, res) => {

    try {
        //hämta alla items på menyn
        let result = await Menu.find({});

        res.json(result);

    } catch(error) {

        return res.status(500).json({ error: error.message });
    }
});


//skapa item
router.post("/addItem", async (req, res) => {
    
    try {
        let result = await Menu.create(req.body);

        return res.status(200).json(result);

    } catch(error) {

        return res.status(400).json({ error: error.message });
    }

});



//uppdatera item
router.put("/updateItem/:id", async (req, res) => {

    try {
       //hämta id och korresponderade item
       const { id }= req.params;

       const updatedItem = await Menu.findByIdAndUpdate(id, req.body, { new: true });

        //validering
        if(!updatedItem) {
            return res.status(404).json({ message: "Item hittades inte" });
        }

        res.status(200).json(updatedItem);
    } catch(error) {

        res.status(500).json({ message: "Något gick fel: " + error.message });
    }

});



//ta bort item
router.delete("/deleteItem/:id", async (req, res) => {

    try {
        //hämta id och korresponderade item
        const { id } = req.params;

        const deletedItem = await Menu.findByIdAndDelete(id, req.body, { new: true });

        //validering
        if(!deletedItem) {
            return res.status(404).json({ message: "Item hittades inte" });
        }

        res.status(200).json({ message: "Item har tagits bort" });

    } catch (error) {

        res.status(500).json({ message: "Något gick fel: " + error.message });
    }
});


module.exports = router;