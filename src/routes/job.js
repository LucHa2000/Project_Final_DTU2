var express = require("express");
var router = express.Router();
let multer = require("multer");
const upload = multer({
  dest: "src/public/uploads/",
});

const jobController = require("../app/controllers/JobController");
router.use("/cancel/:appoinmentId", jobController.cancelAppointment);
router.use("/", jobController.index);
module.exports = router;
