const express = require("express");
const router = express.Router();
import { getUserById, updateUser } from "../service/UserService";
import {
  getAppointmentsByUserID,
  getAppointmentsAndTransactionsByUserID,
} from "../service/AppoinmentService";
class UserController {
  async index(req, res, next) {
    const userId = req.session.userID;
    let account = await getUserById(userId);
    //res.render("user/edit_profile", { account: account });
    res.render("user/profile", { account: account });
  }
  async updateAccountView(req, res, next) {
    const userId = req.session.userID;
    let account = await getUserById(userId);
    res.render("user/edit_profile", { account: account });
  }
  async changeAccount(req, res, next) {
    console.log(req.file)
    if (!req.file) {
      req.body.image = "";
    } else {
      req.body.image = req.file.filename
    }
    let accountChanged = await updateUser(req.body);
    if (accountChanged) {
      res.redirect("/user");
    } else {
      console.log("Change failed !");
    }
  }
  async transactionHistory(req, res, next) {
    let appointments = await getAppointmentsAndTransactionsByUserID(
      req.session.userID,
      3
    );

    for (let appointment of appointments) {
      appointment.balance = appointment["TransactionHistory.balance"];
    }

    res.render("user/transactionHistory", { appointments: appointments });
  }
}
module.exports = new UserController();
