const express = require("express");// import the express module
const cors = require("cors"); // import cors
require("dotenv").config(); // import dotenv
const db = require("./database/db"); // import database connection
const packageRoutes = require("./routes/packageRoutes");


const app = express(); // initialize express app

app.use(cors()); // use cors

// parse incoming json payloads using global middleware
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("StudioFlow API is running");
})

app.use("/api", packageRoutes);

// start the server
app.listen(PORT, () => {
  console.log(`StudioFlow Api is running on http://localhost:${PORT}`);
});
