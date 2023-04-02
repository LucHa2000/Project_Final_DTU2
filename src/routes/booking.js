var express = require("express");
var router = express.Router();
let multer = require("multer");
const upload = multer({
  dest: "src/public/uploads/",
});

const bookingController = require("../app/controllers/BookingController");

router.post("/createAppointment", bookingController.createAppointment);
router.post("/bookingform", bookingController.index);
router.use("/displayBookingForm", bookingController.displayBookingForm);
module.exports = router;
