// using the library sqlite3
const sqlite3 = require('sqlite3');

// const DB_SOURCE = "db.sqlite";

// instantiating the object/instance "Database" || open the database connection
const db = new sqlite3.Database('./database/studioflow.db', (err) => {
    if(err){
        console.log("error connecting to database!");
    } else {
        console.log("connected to the database successfully!");
    }
});

module.exports = db;


