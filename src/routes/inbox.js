var express = require("express");
var router = express.Router();
let multer = require("multer");
const upload = multer({
  dest: "src/public/uploads/",
});

const InboxController = require("../app/controllers/InboxController");
router.post("/saveMessage", InboxController.saveMessage);
router.use("/:appointmentTitle", InboxController.displayChat);
router.use("/", InboxController.index);
module.exports = router;
