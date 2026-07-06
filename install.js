//initiera
const express = require("express");
const authRoutes = require(/routes/authRoutes);
const mongoose = require("mongoose");
const { Client } = require("mongoose");
require("dotenv").config();

//anslut till databasen
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB).then(() => {
    console.log("Är nu uppkopplad till databasen hos MongoDB");
}).catch((error) => {
    console.log("Det uppstod ett fel vid uppkoppling till databasen");
});

//felmeddelande
client.connect((error) => {
    if(error) {
        console.log("Anslutningsfel: " + error)
    } else {
        console.log("Ansluten till databasen!");
    }
});

