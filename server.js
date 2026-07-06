//initiera
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 1200;

//koppla till databasen
mongoose.connect(process.env.DB)
    .then(() => {
        console.log("Ansluten till MongoDB");
    })
    .catch(() => {
        console.log("Anslutningsfel");
    });


//routes
app.use("/api", authRoutes);


//skyddad route


//validera JWT



//starta app
app.listen(port, () => {
    console.log(`Servern är igång på http://localhost:${port}`);
})