const db = require(`../database/db`);

const packageModel = {
  findAll: (callback) => {
    const sql = `SELECT * FROM packages`;
    db.all(sql, [], callback);
  },

  findById: (id, callback) => {
    const sql = `SELECT * FROM packages WHERE id = ?`;
    db.get(sql, [id], callback);
  },

  findPackName: (id) => {
    const sql = `SELECT name FROM packages WHERE id = ?`;
    db.get(sql, [id], (err, row) => {
      if(err){
        return "not found"
      } 
      if (!row){
        return "ho lee shi"
      } 

      return row.name;
    })
  },

  create: (packageData, callback) => {
    const sql = `INSERT INTO packages (name, price, duration, description) VALUES (?, ?, ?, ?)`;
    // function that execute the query on database
    db.run(sql, packageData, callback);
  },

  update: (packageData, callback) => {
    // sql query to update packages by id
    const sql = `UPDATE packages
    SET name = ?, price = ?, duration = ?, description = ?
    WHERE id = ?
  `;

    db.run(sql, packageData, callback);
  },

  delete: (id, callback) => {
    // query to delete record from database
    const sql = `DELETE FROM packages WHERE id = ?`;
    db.run(sql, [id], callback);
  },
};

module.exports = packageModel;
