const express = require("express");
const moment = require("moment");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
// const schedule = require("node-schedule");
import { formatDate } from "../../util/dateNow";
import {
  getAppointmentsOnDayByUserID,
  cancelAppointment,
} from "../service/AppoinmentService";
import { getUserById } from "../service/UserService";
class JobController {
  async index(req, res, next) {
    let defaultDate = req.query.date;

    let userSchedule = await getAppointmentsOnDayByUserID(
      req.session.userID,
      req.session.roleID,
      defaultDate
    );
    for (let element of userSchedule) {
      // console.log(element.doctorID);
      let user = await getUserById(element.userID);
      element.userAvatar = user.image;
      element.userName = user.firstName + " " + user.lastName;
    }

    res.render("doctor/schedule", { userSchedule: userSchedule, defaultDate });
  }

  async cancelAppointment(req, res, next) {
    let isSuccess = await cancelAppointment(req.params.appoinmentId);

    if (isSuccess) {
      console.log("cancel succeful!");
      res.redirect("back");
    } else {
      console.log("cancel error");
    }
  }
}

module.exports = new JobController();
