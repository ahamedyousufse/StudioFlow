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
      }

      if (!row) {
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

    const error = validateInput(
      customer_name,
      phone,
      event_date,
      venue,
      package_id,
    );

    if (error) {
      return res.status(400).json({ error });
    }

    packageModel.findById(package_id, (err, row) => {
      if (err) {
        console.error(`error finding package: ${err.message}`);
        return res.status(500).json({ error: "internal server error" });
      }

      if (!row) {
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

  updateBooking: (req, res) => {
    const booking_id = req.params.id;
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
      booking_id,
    ];

    bookingModel.findById(booking_id, (err, row) => {
      if (err) {
        console.error(`error finding booking for update: ${err.message}`);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (!row) {
        return res.status(404).json({ error: "booking doesn't exist" });
      }
    });

    packageModel.findById(package_id, (err, row) => {
      if (err) {
        console.error(
          `error finding package for booking updates: ${err.message}`,
        );
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (!row) {
        return res.status(404).json({ error: "package doesn't exist" });
      }
    });

    const error = validateInput(
      customer_name,
      phone,
      event_date,
      venue,
      package_id,
    );

    if (error) {
      return res.status(400).json({ error });
    }

    bookingModel.update(bookingData, function (err) {
      if (err) {
        console.error(`errro updating booking: ${err.message}`);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (this.changes === 0) {
        return res.status(500).json({ error: "couldn't udpate booking" });
      }

      res.status(201).json({ message: "booking updated successfully" });
    });
  },

  deleteBooking: (req, res) => {
    const bookingId = req.params.id;

    bookingModel.delete(bookingId, function (err) {
      if (err) {
        console.error(`error deleting booking: ${err.message}`);
        return res.status(500).json({ error: "Internal Server Error" });
      } else if (this.changes === 0) {
        return res.status(404).json({ error: "booking not found" });
      }

      res.status(200).json({ message: "booking deleted successfully!" });
    });
  },
};

function validateInput(customer_name, phone, event_date, venue, package_id) {
  // validating customer name, phone, event date, venue, package id
  // phone validation should validate more parameters (eg. min lenght, max length etc..)
  if (!customer_name) {
    return "name cannot be empty";
  }
  if (!phone) {
    return "phone number cannot be empty";
  }
  if (isNaN(phone)) {
    return "enter phone number in numbers";
  }
  if (!event_date) {
    return "event date cannot be empty";
  }
  if (!venue) {
    return "venue cannot be empty";
  }
  if (!package_id) {
    return "package id cannot be empty";
  }

  return null;
}

module.exports = bookingController;
