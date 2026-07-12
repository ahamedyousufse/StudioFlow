// import the express module
const express = require("express");
// import cors
const cors = require("cors");
// import database connection
const db = require("./database/db");

// initialize express app
const app = express();
// use cors
app.use(cors());

// parse incoming json payloads using global middleware
app.use(express.json());



// defining the port
const PORT = 3000;

// route handler for the root path
app.get("/", (req, res) => {
    res.send("StudioFlow API is running");
});


// start the server
app.listen(PORT, () => {
    console.log(`StudioFLow Api is running on http://localhost:${PORT}`);
    
});