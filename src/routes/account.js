const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({
  dest: "src/public/uploads/",
});

const accountController = require("../app/controllers/AccountController");

router.get("/delete/:id", accountController.deleteAccount);
router.get("/:id", accountController.pageUpdate);
router.get("/:status/:id", accountController.changeStatus);
router.post("/storeAccount", accountController.storeAccount);
router.post("/:id/edit", accountController.newAccount);

module.exports = router;
