const express = require("express");
const router = express.Router();
import {
  getUserByEmailAndPassword,
  getUserByEmail,
  createNewUser,
  sendMail,
  getUserById,
} from "../service/UserService";
import { getNotificationByUserID } from "../service/NotificationService";

class AuthMiddlewares {
  async checkAccount(req, res, next) {
    if (!req.session.userID) {
      res.redirect("/auth/login");
      //return;
    } else {
      let user = await getUserById(req.session.userID);
      if (user) {
        next();
      } else {
        res.redirect("/auth/login");
      }
    }
  }
  checkRoleAdmin(req, res, next) {
    if (req.session.roleID) {
      if (req.session.roleID === 1) {
        next();
      } else {
        res.redirect("/auth/login");
      }
    } else res.redirect("/auth/login");
  }
  checkRoleUser(req, res, next) {
    if (req.session.roleID) {
      if (req.session.roleID === 3) {
        next();
      } else {
        res.redirect("/auth/login");
      }
    } else res.redirect("/auth/login");
  }
  checkRoleDoctor(req, res, next) {
    if (req.session.roleID) {
      if (req.session.roleID === 2) {
        next();
      } else {
        res.redirect("/auth/login");
      }
    } else res.redirect("/auth/login");
  }
  async addInfoAuthencation(req, res, next) {
    try {
      if (req.session.userID) {
        res.locals.userID = req.session.userID;
        let user = await getUserById(req.session.userID);
        res.locals.firstName = user.firstName;
        res.locals.lastName = user.lastName;
        res.locals.image = user.image;
        let notifications = await getNotificationByUserID(
          req.session.userID,
          user.roleID
        );
        res.locals.notifications = notifications;
        if (req.session.roleID === 2) {
          res.locals.doctorLogin = true;
        } else if (req.session.roleID === 3) {
          res.locals.userLogin = true;
        }
        next();
      } else {
        next();
      }
    } catch (err) {
      console.log(err);
    }
  }
  checkLogin(req, res, next) {
    if (req.session.roleID) {
      res.redirect("back");
    } else next();
  }
}
module.exports = new AuthMiddlewares();
