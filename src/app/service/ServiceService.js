const bcrypt = require("bcryptjs");
const db = require("../models/index");
let salt = bcrypt.genSaltSync(10);

let getServiceByDoctorId = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let service = await db.Service.findOne({
        where: { UserId: id },
        raw: true,
      });
      resolve(service);
    } catch (e) {
      reject(e);
    }
  });
};
let updateServiceFeeByID = (doctorID, serviceFee) => {
  return new Promise(async (resolve, reject) => {
    try {
      let service = await db.Service.findOne({
        where: { UserId: doctorID },
      });
      if (service) {
        service.fee = serviceFee;
        service.updatedAt = new Date();
        service.createdAt = new Date();
        service.save();
        resolve();
      } else {
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getServiceByDoctorId,
  updateServiceFeeByID,
};
