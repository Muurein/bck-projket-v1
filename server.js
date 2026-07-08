//initiera
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
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
app.get("/api/admin", authenticateToken, (req, res) => {
    
    res.json(req.user);
})

//validera JWT
function authenticateToken(req, res, next) {

    const header = req.headers["authorization"];
    const token = header && header.split(" ")[1];

    console.log("JWT-token:", token); //TA BORT SEN

    if(!jwt) {
        return res.status(401).json({ message: "Du saknar tillgång till den här routen - token behövs" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
        
        if(error) {
            console.log("JWT-verifieringsfel: ", error);

            return res.status(403).json({ message: "Felaktig JWT"});
        }

        req.user = user;
        next();
    });
}


//starta app
app.listen(port, () => {
    console.log(`Servern är igång på http://localhost:${port}`);
})