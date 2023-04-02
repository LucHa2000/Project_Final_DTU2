const bcrypt = require("bcryptjs");
const db = require("../models/index");
const { Op } = require("sequelize");
import { formatDate } from "../../util/dateNow";
let getDoctorByClinicId = (clinicId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findAll({
        where: { clinicID: clinicId, roleID: 2, status: 1 },
        raw: true,
        include: [
          {
            model: db.Clinic,
          },
        ],
      });
      if (user) {
        resolve(user);
      } else {
        resolve(null);
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getResumeById = (resumeId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let resume = await db.Resume.findOne({
        where: { id: resumeId },
        raw: true,
      });

      if (resume) {
        resolve(resume);
      } else {
        resolve(null);
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getDoctorAppointmentAndResumeById = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dateNow = new Date().toString();
      let user = await db.User.findOne({
        where: { id: doctorId, roleID: 2, status: 1 },
        raw: true,
        include: [
          {
            model: db.Resume,
          },
          {
            model: db.Clinic,
          },
        ],
      });
      let appointment = await db.Appointment.findAll({
        where: {
          doctorID: doctorId,
          date: formatDate(dateNow),
          isCanceled: { [Op.or]: [0, null] },
        },
        raw: true,
      });
      if (user || appointment) {
        resolve([user, appointment]);
      } else {
        resolve(null);
      }
    } catch (e) {
      reject(e);
    }
  });
};
let updateResume = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let resume = await db.Resume.findOne({
        where: { id: data.id },
      });
      if (resume) {
        resume.title = data.title;
        resume.description = data.description.trim();
        await resume.save();
        resolve(resume);
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};
let updateFollowDoctorIdStatus = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctor = await db.User.findOne({
        where: { id: id },
      });
      if (doctor) {
        if (doctor.status === 1) {
          doctor.status = 2;
        } else {
          doctor.status = 1;
        }
        await doctor.save();
        resolve(doctor);
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllDoctorClinicAndReview = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctor = await db.User.findAll({
        where: { roleID: 2, status: 1 },
        include: [
          {
            model: db.Review,
          },
          {
            model: db.Clinic,
          },
        ],
        raw: true,
      });
      if (doctor) {
        resolve(doctor);
      } else {
        resolve([]);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllClinic = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let clinic = await db.Clinic.findAll({
        raw: true,
      });
      if (clinic) {
        resolve(clinic);
      } else {
        resolve([]);
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getResumeById,
  updateFollowDoctorIdStatus,
  getDoctorByClinicId,
  updateResume,
  getDoctorAppointmentAndResumeById,
  getAllDoctorClinicAndReview,
  getAllClinic,
};
