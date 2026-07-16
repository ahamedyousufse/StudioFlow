const bookingModel = require("../models/bookingModel");
const packageModel = require("../models/packageModel");

const bookingController = {
  getAllBookings: (req, res) => {
    bookingModel.findAll((err, rows) => {
      if (err) {
        console.error(`error getting all bookings: ${err.message}`);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      res.status(200).json({ bookings: rows });
    });
  },

  getBookingById: (req, res) => {
    const id = req.params.id;

    bookingModel.findById(id, (err, row) => {
      if (err) {
        console.error(`error getting booking with id of ${id}: ${err.message}`);
        return;
      } else if (!row) {
        return res.status(404).json({ error: "Booking not found" });
      }

      res.status(200).json({ booking: row });
    });
  },

  createBooking: (req, res) => {
    const {
      customer_name,
      phone,
      email,
      event_date,
      venue,
      notes,
      package_id,
    } = req.body;

    const bookingData = [
      customer_name,
      phone,
      email,
      event_date,
      venue,
      notes,
      package_id,
    ];

    const error = validateInput(bookingData);

    if (error) {
      return res.status(400).json({ error });
    }

    packageModel.findById(package_id, (err, row) => {
      if (err) {
        console.error(`error finding booking: ${err.message}`);
        return res.status(500).json({ error: "internal server error" });
      } else if (!row) {
        return res.status(404).json({ error: "package not found!" });
      }

      bookingModel.create(bookingData, (err) => {
        if (err) {
          console.error(`error creating booking: ${err.message}`);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        res.status(201).json({ message: "booking created successfully!" });
      });
    });
  },

  updateBooking: (req, res) => {},

  deleteBooking: (req, res) => {},
};

function validateInput(bookingData) {
  // validating customer name, phone, event date, venue, package id
  if (!bookingData[0]) {
    return "name cannot be empty";
  }
  if (!bookingData[1]) {
    return "phone number cannot be empty";
  }
  if (isNaN(bookingData[1])) {
    return "enter phone number in numbers";
  }
  if (!bookingData[3]) {
    return "event date cannot be empty";
  }
  if (!bookingData[4]) {
    return "venue cannot be empty";
  }
  if (!bookingData[6]) {
    return "id cannot be empty";
  }

  return null;
}

module.exports = bookingController;
