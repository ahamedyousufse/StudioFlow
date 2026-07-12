// using the library sqlite3
const sqlite3 = require('sqlite3');

// const DB_SOURCE = "db.sqlite";

// instantiating the object/instance "Database" || open the database connection
const db = new sqlite3.Database('./database/studioflow.db', (err) => {
    if(err){
        // console.log("error connecting to database!"); -- needs improvement.
        console.error(err.message); // this is a better approach and it helps in debugging.
    } else {
        console.log("connected to the database successfully!");
        createTable();
    }
});

// this function creates the table
function createTable(){
    const query = `
        CREATE TABLE IF NOT EXISTS packages (
            id INTEGER PRIMARY KEY UNIQUE,
            name TEXT NOT NULL UNIQUE,
            price REAL NOT NULL,
            duration TEXT NOT NULL,
            description TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `;

    db.run(query, (err) => {
        if (err) {
            console.error(`error while creating table: ${err.message}`);
        } else {
            console.log("packages table created successfully!");
        }
    });
}

module.exports = db;


