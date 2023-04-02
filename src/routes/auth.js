var express = require("express");
var router = express.Router();
let multer = require("multer");
const upload = multer({
  dest: "src/public/uploads/",
});
const authMiddlewares = require("../app/middlewares/AuthMiddlewares");
const authController = require("../app/controllers/AuthController");

router.get("/login", authMiddlewares.checkLogin, authController.index); // => /auth/login
router.post("/login", authController.login);
router.get("/register", authController.registerPage); // => /auth/register
router.post("/register", authController.confirmEmailRegister);
router.get("/code", authController.registerConfirmEmail);
router.post("/code", authController.confirmCode);
router.get("/registerAccount", authController.registerAccount);
router.post("/registerAccount", authController.saveAccount);
router.get("/forgotAccount", authController.forgotPasswordPage);
router.post("/forgotAccount", authController.sendPasswordToEmail);
router.get("/changePassword", authController.displayChangePassword);
router.post("/changePassword", authController.changePassword);
router.get("/logout", authController.logout);

module.exports = router;
