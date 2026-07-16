const express = require("express");
const bookingController = require("../controllers/bookingController");

const router = express.Router();

router
  .route("/bookings")
  .get(bookingController.getAllBookings)
  .post(bookingController.createBooking);

router
  .route("/bookings/:id")
  .get(bookingController.getBookingById)
  .put(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

module.exports = router;
