const db = require("../models/index");
const { v4: uuidv4 } = require("uuid");
import { formatDate, getTimeNow } from "../../util/dateNow";
let getNotificationByUserID = (userID, roleID) => {
  return new Promise(async (resolve, reject) => {
    try {
      let notifications;
      if (roleID === 2) {
        notifications = await db.Notification.findAll({
          where: { UserId: userID },
          raw: true,
          order: [["createdAt", "DESC"]],
        });
      } else if (roleID === 3) {
        notifications = await db.Notification.findAll({
          where: { fromUserID: userID },
          raw: true,
          order: [["createdAt", "DESC"]],
        });
      }
      if (notifications) {
        resolve(notifications);
      } else {
        resolve([]);
      }
    } catch (e) {
      reject(e);
    }
  });
};
let createNotification = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let newNotification = await db.Notification.create({
        id: uuidv4(),
        AppointmentId: data.appointmentId,
        title: data.title,
        content: data.content,
        link: data.link,
        fromUserID: data.fromUserID,
        UserId: data.doctorID,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      resolve(newNotification);
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  getNotificationByUserID,
  createNotification,
};
