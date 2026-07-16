// using the library sqlite3
const sqlite3 = require("sqlite3");

// const DB_SOURCE = "db.sqlite";

// instantiating the object/instance "Database" || open the database connection
const db = new sqlite3.Database("./database/studioflow.db", (err) => {
  if (err) {
    console.error(err.message); // this is a better approach and it helps in debugging.
  } else {
    db.run('PRAGMA foreign_keys = ON;');
    console.log("connected to the database successfully!");
    createPackagesTable();
    createBookingsTable();
  }
});

// this function creates the table packages
function createPackagesTable() {
  const query = `
        CREATE TABLE IF NOT EXISTS packages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
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
      seedPackages();
      // readDatabase();
    }
  });
}

// creating bookings table
function createBookingsTable() {
  const query = `CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    event_date TEXT NOT NULL,
    venue TEXT NOT NULL, 
    notes TEXT,
    status TEXT DEFAULT "Pending",
    package_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(package_id)
    REFERENCES packages(id)
  )`;

  db.run(query, (err) => {
    if(err){
      console.error(`error creating bookings table: ${err.message}`);
    } else {
      console.log("bookings table has been created successfully");
    }
  });
}

// function to seed data to the table packages
function seedPackages() {
  db.get(`SELECT COUNT(*) AS count FROM packages`, [], (err, row) => {
    if (err) {
      return console.error(`error while checking row count`);
    }

    if (row.count === 0) {
      console.log("seeding started...");

      const packages = [
        {
          name: "gold",
          price: "50000",
          duration: "3 hours",
          description: "upto 100 photos. delivery in 10 days. 1 review",
        },
        {
          name: "silver",
          price: "75000",
          duration: "5 hours",
          description: "upto 150 photos. delivery in 13 days. 2 reviews",
        },
        {
          name: "platinum",
          price: "100000",
          duration: "8 hours",
          description: "upto 300 photos. delivery in 15 days. 3 reviews",
        },
      ];

      const insertQuery = `
        INSERT INTO packages (name, price, duration, description) VALUES (?,?,?,?)
      `;

      packages.forEach((package) => {
        db.run(
          insertQuery,
          [package.name, package.price, package.duration, package.description],
          (err) => {
            if (err) {
              console.error(
                `couldn't seed package: ${package.name}: ${err.message}`,
              );
            } else {
              console.log(`seeded ${package.name} successfully!`);
            }
          },
        );
      });
    } else {
      console.log("database is not empty... skipping seeding...");
    }
  });
}

// function readDatabase() {
//   db.all(`SELECT * FROM packages`, (err, rows) => {
//     if (err) {
//       console.log("error reading data!");
//     } else {
//       console.log("**************** CREATED PACKAGES ******************");
//       rows.forEach((row) => {
//         console.log(
//           `package name: ${row.name}\nprice: ${row.price}\nduration: ${row.duration}\ndescription: ${row.description}\ncreated at: ${row.created_at}`,
//         );
//       });
//     }
//   });
// }

module.exports = db;
