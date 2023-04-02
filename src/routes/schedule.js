var express = require("express");
var router = express.Router();
let multer = require("multer");
const upload = multer({
  dest: "src/public/uploads/",
});

const scheduleController = require("../app/controllers/ScheduleController");
router.use("/cancel/:appoinmentId", scheduleController.cancelAppointment);
router.use("/", scheduleController.index);
module.exports = router;
