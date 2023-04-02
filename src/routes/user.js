var express = require("express");
var router = express.Router();
let multer = require("multer");
const upload = multer({
  dest: "src/public/uploads/",
});

const userController = require("../app/controllers/UserController");
const { route } = require("./site");

router.post(
  "/changeAccount",
  upload.single("image"),
  userController.changeAccount
);
router.use("/updateAccount", userController.updateAccountView);
router.use("/transactionHistory", userController.transactionHistory);
router.use("/", userController.index);
module.exports = router;
