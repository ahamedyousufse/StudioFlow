const db = require("../database/db");

const bookingModel = {
  findAll: (callback) => {
    const sql = `SELECT * FROM bookings`;
    db.all(sql, [], callback);
  },

  findById: (id, callback) => {
    const sql = `SELECT * FROM bookings WHERE id = ?`;
    db.get(sql, [id], callback);
  },

  create: (bookingData, callback) => {
    const sql = `INSERT INTO bookings (customer_name, phone, email, event_date, venue, notes, package_id)
        VALUES (?,?,?,?,?,?,?)
    `;

    db.run(sql, bookingData, callback);
  },

  update: (bookingData, callback) => {
    const sql = `UPDATE bookings
        SET customer_name = ?, phone = ?, email = ?, event_date = ?, venue = ?, notes = ?, status = ?, package_id = ?
        WHERE id = ?
    `;

    db.run(sql, bookingData, callback);
  },

  delete: (id, callback) => {
    const sql = `DELETE FROM bookings WHERE id = ?`;
    db.run(sql, [id], callback);
  },
};

module.exports = bookingModel;
