var express = require("express");
var router = express.Router();
let multer = require("multer");
const upload = multer({
  dest: "src/public/uploads/",
});
const doctorController = require("../app/controllers/DoctorController");
router.post(
  "/changeAccount",
  upload.single("image"),
  doctorController.changeAccountDoctor
);
router.post("/changeResume", doctorController.changeResume);
router.use("/workHistory", doctorController.workHistory);
router.get("/changeStatus", doctorController.changeStatus);
router.use("/resume", doctorController.doctorResume);
router.use("/updateAccount", doctorController.displayUpdateAccount);
router.use("/", doctorController.index);
module.exports = router;
