var express = require("express");
var router = express.Router();
let multer = require("multer");
const upload = multer({
  dest: "src/public/uploads/",
});

const callVideoController = require("../app/controllers/CallVideoController");

router.use("/", callVideoController.index);
module.exports = router;
