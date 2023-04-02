const express = require("express");
const router = express.Router();
const app = express();
const server = require("http").Server(app);
var io = require("socket.io")(server);
const { v4: uuidv4 } = require("uuid");
import {
  getAppointmentsByUserID,
  getAppointmentsByTitle,
} from "../service/AppoinmentService";
import {
  createMessage,
  getMessageAndAppointmentByAppointmentIDandTile,
} from "../service/MessageService";
import { getUserById } from "../service/UserService";

import { getAppointmentById } from "../service/AppoinmentService";
import { serverNotification } from "../../public/script/socketServer";
class InboxController {
  async index(req, res, next) {
    let userID = req.session.userID;
    let roleID = req.session.roleID;
    let getGroupChat = await getAppointmentsByUserID(userID, roleID);

    let account = {
      id: req.session.userID,
      lastName: req.session.lastName,
      firstName: req.session.firstName,
    };
    //save id room

    res.render("user/inbox-list", {
      appointments: getGroupChat,
      account: account,
    });
  }
  async saveMessage(req, res) {
    req.body.id = uuidv4();

    req.body.message = req.body.message;
    let newMessage = await createMessage(req.body);
    if (newMessage) {
      let getAppointment = await getAppointmentById(newMessage.appointmentID);
      let notificationInbox;
      //send notification
      if (getAppointment.userID == req.session.userID) {
        notificationInbox = {
          userID: getAppointment.doctorID,
          content: "Bạn có tin nhắn mới !",
        };
      } else if (getAppointment.doctorID == req.session.userID) {
        notificationInbox = {
          userID: getAppointment.userID,
          content: "Bạn có tin nhắn mới !",
        };
      }

      serverNotification(io, "", notificationInbox);
      console.log("insert success!");
    } else console.log("insert Error ! ");
  }

  async displayChat(req, res) {
    let userID = req.session.userID;
    let roleID = req.session.roleID;
    let allRooms = await getAppointmentsByUserID(userID, roleID);
    let room = req.params.appointmentTitle;
    try {
      let result = await getMessageAndAppointmentByAppointmentIDandTile(room);
      let user = await getUserById(userID);
      let account = {
        id: req.session.userID,
        lastName: user.lastName,
        firstName: user.firstName,
        avatar: user.image,
        room: room,
      };

      const appointment = result[0];
      const messages = result[1];

      res.render("user/inbox", {
        account: account,
        roomID: appointment.id,
        messages: messages,
        rooms: allRooms,
      });
    } catch (e) {
      console.log(e);
    }
  }
}
module.exports = new InboxController();
