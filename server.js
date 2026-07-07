//initiera
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const menuRoutes = require("./routes/menuRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 1200;

app.use(cors());
app.use(express.json());

console.log("Server.js körs");

//koppla till databasen
mongoose.connect(process.env.DB)
    .then(() => {
        console.log("Ansluten till MongoDB");
    })
    .catch((error) => {
        console.log("Anslutningsfel: ", error);
    });


//routes
app.get("/", (req, res) => {
    res.send("Servern fungerar!");
});

console.log("Registrerar routes...");
app.use("/api", authRoutes);
app.use("/api/menu", menuRoutes);

//skyddad route


//validera JWT



//starta app
app.listen(port, () => {
    console.log(`Servern är igång på http://localhost:${port}`);
})