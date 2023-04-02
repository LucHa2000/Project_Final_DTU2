const db = require("../models/index");

let getMessageAndAppointmentByAppointmentIDandTile = (title) => {
  return new Promise(async (resolve, reject) => {
    try {
      let appointment = await db.Appointment.findOne({
        where: { title: title },
        raw: true,
      });

      let messages = await db.Message.findAll({
        where: { appointmentID: appointment.id },
        order: [["createdAt", "ASC"]],
        raw: true,
      });
      let arrayMessage = messages;
      let returnName = async () => {
        for (let e of arrayMessage) {
          let user = await db.User.findOne({
            where: { id: e.userID },
            raw: true,
          });
          e.userName = user.firstName + " " + user.lastName;
        }

        if (appointment) {
          resolve([appointment, arrayMessage]);
        } else {
          resolve([]);
        }
      };

      returnName();
    } catch (e) {
      reject(e);
    }
  });
};

let createMessage = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let newMessage = await db.Message.create({
        id: data.id,
        appointmentID: data.roomID,
        message: data.message,
        userID: data.senderID,
      });

      resolve(newMessage);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createMessage: createMessage,
  getMessageAndAppointmentByAppointmentIDandTile,
};
