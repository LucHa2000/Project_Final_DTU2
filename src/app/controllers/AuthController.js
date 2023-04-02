const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
let salt = 5;

let Random = Math.floor(Math.random() * 1000000 + 100).toString();
import { response } from "express";

import {
  updatePassword,
  getUserByEmailAndPassword,
  getUserByEmail,
  createNewUser,
  sendMail,
} from "../service/UserService";
class AuthController {
  index(req, res) {
    res.render("auth/login", {
      message: req.session.errorLogin,
      messageRegister: req.session.messageRegister,
    });
    if (req.session.errorLogin) {
      req.session.errorLogin = null;
    }
    if (req.session.messageRegister) {
      req.session.messageRegister = null;
    }
  }
  //login
  async login(req, res) {
    // console.log("req.session.userId: ", req.session.userId);

    let captCha = req.body["g-recaptcha-response"];
    if (captCha) {
      let user = await getUserByEmailAndPassword(
        req.body.email,
        req.body.password
      );

      if (user && user.status != 0) {
        const accountRole = user.roleID;
        const accountID = user.id;
        const firstName = user.firstName;
        const lastName = user.lastName;
        const image = user.image;
        const resumeID = user.resumeID;

        //save account to session
        req.session.firstName = firstName;
        req.session.lastName = lastName;
        req.session.userID = accountID;
        req.session.roleID = accountRole;
        req.session.image = image;
        req.session.resumeID = resumeID;
        //console.log(req.session);
        if (accountRole === 1) {
          res.redirect("/admin");
        }
        if (accountRole === 2) {
          res.redirect("/");
        }

        if (accountRole === 3) {
          res.redirect("/");
        }
      } else {
        //return message
        req.session.errorLogin = "Email or password is wrong please re-enter !";
        res.redirect("back");
      }
    } else {
      //return message
      req.session.errorLogin = "Please confirm captcha !";
      res.redirect("back");
    }
  }
  logout(req, res) {
    req.session.destroy();
    res.redirect("/");
  }
  // register page
  registerPage(req, res) {
    res.render("auth/signup_email", { message: req.session.errorRegister });
    if (req.session.errorRegister) {
      req.session.errorRegister = null;
    }
  }
  //render confirm email page
  registerConfirmEmail(req, res) {
    res.render("auth/confirmEmail_view", {
      message: req.session.errorConfirmCode,
    });
    req.session.errorConfirmCode = null;
  }
  //confirm email register
  async confirmEmailRegister(req, res) {
    //check account
    let userExists = await getUserByEmail(req.body.email);

    if (userExists !== null) {
      //Email is already registered
      // req.session.errorRegister = "Email is already registered !";
      // res.redirect("/auth/register");
      res.send({
        error: "Email này đã được sử dụng",
      });
      //sendmail
    } else {
      req.session.code = Random;
      req.session.email = req.body.email;
      sendMail(
        req.body.email,
        "danchoiphonui27@gmail.com",
        "yhofjnwkxjrpdckd",
        Random
      );
      //save session :code,email
      req.session.code = Random;
      req.session.email = req.body.email;
      // res.redirect("/auth/code");
      console.log("code is:", req.session.code);
      res.send({ ok: true });
    }
  }
  confirmCode(req, res) {
    let code = req.body.code;
    let codeConfirm = req.session.code;
    if (code === codeConfirm) {
      req.session.accountVerified = true;
      req.session.code = null;
      // res.redirect("/auth/registerAccount");
      res.send({ ok: true });
    } else {
      // req.session.errorConfirmCode =
      //   "The code is wrong, please check the code again!";
      // res.redirect("back");
      res.send({ registerError: "Mã không đúng, vui lòng thử lại." });
    }
  }
  registerAccount(req, res) {
    if (req.session.accountVerified == true) {
      req.session.accountVerified = null;
      res.render("auth/signup");
    } else {
      res.redirect("/auth/register");
    }
  }
  async saveAccount(req, res) {
    req.body.id = uuidv4();
    req.body.email = req.session.email;
    let createUser = await createNewUser(req.body);
    if (createUser) {
      req.session.messageRegister =
        "Đăng ký thành công, vui lòng đăng nhập để tiếp tục!";
      res.redirect("/auth/login");
    } else res.redirect("/auth/register");
  }
  //forgot Password
  forgotPasswordPage(req, res) {
    const message = req.session.errorForgotPassword;
    res.render("auth/forgotAccountPage", { message: message });
    req.session.errorForgotPassword = null;
  }
  async sendPasswordToEmail(req, res) {
    //check account
    let userExists = await getUserByEmail(req.body.email);

    if (userExists !== null) {
      //sendmail
      sendMail(
        req.body.email,
        "danchoiphonui27@gmail.com",
        "yhofjnwkxjrpdckd",
        Random
      );
      //save session :code,email
      req.session.codeForgotAccount = Random;
      req.session.emailForgotAccount = req.body.email;
      res.redirect("/auth/changePassword");
    } else {
      //Email is does not exist
      req.session.errorForgotPassword = "Tài Khoản Không Tồn Tại !";
      res.redirect("back");
    }
  }

  //change password
  displayChangePassword(req, res) {
    const code = req.session.codeForgotAccount;
    const email = req.session.emailForgotAccount;
    let message = req.session.messageCode;
    if (code && email) {
      res.render("auth/changePasswordPage", { message: message });
      req.session.messageCode = null;
    } else {
      res.redirect("back");
    }
  }
  async changePassword(req, res) {
    if (req.body.code == req.session.codeForgotAccount) {
      let email = req.session.emailForgotAccount;
      let isUpdated = await updatePassword(email, req.body.password);
      if (isUpdated) {
        req.session.emailForgotAccount = null;
        req.session.codeForgotAccount = null;
        req.session.messageRegister =
          "Thay đổi mật khẩu thành công, vui lòng đăng nhập để tiếp tục!";
        res.redirect("/auth/login");
      }
    } else {
      req.session.messageCode = "Sai Mã Code , Vui Lòng Nhập Lại";
      res.redirect("back");
    }
  }
}
module.exports = new AuthController();
