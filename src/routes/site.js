var express = require("express");
var router = express.Router();
let multer = require("multer");
const upload = multer({
  dest: "src/public/uploads/",
});

const siteController = require("../app/controllers/SiteController");
router.get("/clinics/:clinicId", siteController.displayDoctors);
router.get("/detailDoctor/:doctorId", siteController.doctorDetail);
router.use("/allDoctor", siteController.searchAllDoctor)
router.use("/allClinic", siteController.searchAllClinic)
router.use("/", siteController.index);
module.exports = router;
