// import the express module
const express = require("express");
// import cors
const cors = require("cors");
// import database connection
const db = require("./database/db");
// import dotenv
require("dotenv").config();
const testRoute = require("./routes/testRoute");

// initialize express app
const app = express();
// use cors
app.use(cors());

// parse incoming json payloads using global middleware
app.use(express.json());

// defining the port
const PORT = process.env.PORT || 3000;

// route handler for the root path
app.get("/api", testRoute);

app.get("/api/packages", (req, res) => {
  // read packages table from the database
  db.all(`SELECT * FROM packages`, [], (err, rows) => {
    if (err) {
      console.error("error reading the table packages: ", err.message);
      return res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json({ packages: rows });
    }
  });
});

app.get("/api/packages/:id", (req, res) => {
  // get pacakage by id
  db.get(`SELECT * FROM packages WHERE id = ${req.params.id}`, (err, row) => {
    if (err) {
      console.error("error fetching package: ", err.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (!row) {
      return res.status(400).json({ error: "package not found" });
    }

    res.status(200).json({ package: row });
  });
});

app.post("/api/packages", (req, res) => {
  // query to insert new packages to the database
  const insertQuery = `INSERT INTO packages (name, price, duration, description) VALUES (?, ?, ?, ?)`;

  if(!req.body.name){
    return res.status(400).json({error: "name con not be empty!"});
  } else if(req.body.price <= 0){
    return res.status(400).json({error: "enter a valid price!"});
  } else if(!req.body.duration){
    return res.status(400).json({error: "duration con not be empty!"});
  }

  // function that execute the query on database
  db.run(
    insertQuery,
    [req.body.name, req.body.price, req.body.duration, req.body.description],
    (err) => {
      if (err) {
        console.error("error creating package: ", err.message);
        return res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(200).json({ message: "package created successfully" });
      }
    },
  );
});

app.put("/api/packages/:id", (req, res) => {
  // sql query to update packages by id
  const updateQuery = `UPDATE packages
    SET name = ?, price = ?, duration = ?, description = ?
    WHERE id = ?
  `;

  db.run(
    updateQuery,
    [
      req.body.name,
      req.body.price,
      req.body.duration,
      req.body.description,
      req.params.id,
    ],
    (err) => {
        if(err){
            console.error("error updating package: ", err.message);
            return res.status(500).json({error: "Internal Server Error"});
        }
        else {
            res.status(200).json({message: "Updated package successfully!"});
        }
    },
  );
});

app.delete("/api/packages/:id", (req, res) => {
  // query to delete record from database
  const deleteQuery =  `DELETE FROM packages WHERE id = ?`;
  const packageId = req.params.id; // id of the package that is going to be deleted

  // function that executes the delete query
  db.run(deleteQuery, [packageId], (err) => {
    if(err){
      console.error("error deleting the package: ", err.message);
      return res.status(500).json({error: err.message});
    } else {
      res.status(200).json({message: "deleted package successfully"});
    }
  })
  
});

// start the server
app.listen(PORT, () => {
  console.log(`StudioFlow Api is running on http://localhost:${PORT}`);
});
