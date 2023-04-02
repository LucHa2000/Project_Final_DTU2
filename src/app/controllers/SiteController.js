const express = require("express");
const router = express.Router();
import { formatDate, getTimeNow } from "../../util/dateNow";
import {
  findAllClinicAnDoctorWithClinic,
  getClinicById,
} from "../service/ClinicService";
import { getServiceByDoctorId } from "../service/ServiceService";
import {
  getDoctorByClinicId,
  getDoctorAppointmentAndResumeById,
  getAllDoctorClinicAndReview,
  getAllClinic,
} from "../service/DoctorService";
import { getAppointmentsByUserID } from "../service/AppoinmentService";
class SiteController {
  async index(req, res, next) {
    try {
      let data = await findAllClinicAnDoctorWithClinic();
      let clinics = data[0];
      let doctors = data[1];
      let doctorsWithClinicName = [];
      for (let e of doctors) {
        e.clinicName = e["Clinic.name"];
        doctorsWithClinicName.push(e);
      }
      res.render("user/home", {
        clinics: clinics,
        doctors: doctorsWithClinicName,
      });
    } catch (err) {
      console.log(err);
    }
  }
  async displayDoctors(req, res, next) {
    const clinicId = req.params.clinicId;
    let doctors = await getDoctorByClinicId(clinicId);
    let clinic = await getClinicById(clinicId);
    let listDoctorsRender = [];
    for (let e of doctors) {
      e.clinicName = e["Clinic.name"];
      listDoctorsRender.push(e);
    }
    //res.send(doctors);
    res.render("user/doctorFollowClinic", {
      doctors: listDoctorsRender,
      clinic: clinic,
    });
  }
  async doctorDetail(req, res, next) {
    try {
      const doctorId = req.params.doctorId;
      let serviceFee = await getServiceByDoctorId(doctorId);

      let timeWorks = [
        {
          id: doctorId,
          startTime: "08:00:00",
          endTime: "10:00:00",
          serviceFee: serviceFee.fee,
        },
        {
          id: doctorId,
          startTime: "10:00:00",
          endTime: "12:00:00",
          serviceFee: serviceFee.fee,
        },
        {
          id: doctorId,
          startTime: "13:00:00",
          endTime: "15:00:00",
          serviceFee: serviceFee.fee,
        },
        {
          id: doctorId,
          startTime: "15:00:00",
          endTime: "17:00:00",
          serviceFee: serviceFee.fee,
        },
        {
          id: doctorId,
          startTime: "18:00:00",
          endTime: "20:00:00",
          serviceFee: serviceFee.fee,
        },
        {
          id: doctorId,
          startTime: "20:00:00",
          endTime: "22:00:00",
          serviceFee: serviceFee.fee,
        },
      ];
      let result = await getDoctorAppointmentAndResumeById(doctorId);
      let doctor = result[0];
      let doctorSchedules = result[1];
      doctor.resumeDescription = doctor["Resume.description"];
      doctor.resumeStarNo = doctor["Resume.starNo"];
      doctor.clinicName = doctor["Clinic.name"];
      //check time book with time now
      let filterTimeWork = [];
      for (let i = 0; i < timeWorks.length; i++) {
        if (timeWorks[i].startTime <= getTimeNow()) {
          filterTimeWork.push(timeWorks[i]);
        }
      }
      // check time book not match with time work
      for (let i = 0; i < filterTimeWork.length; i++) {
        for (let j = 0; j < doctorSchedules.length; j++) {
          if (filterTimeWork.length > 0) {
            if (doctorSchedules[j].startTime == filterTimeWork[i].startTime) {
              filterTimeWork.splice(i, 1);
            }
          } else {
            break;
          }
        }
        // console.log(filterTimeWork[i]);
      }

      console.log(result);
      res.render("user/detailDoctor", {
        doctor: doctor,
        timeWorks: filterTimeWork,
        serviceFee: serviceFee,
        messageBooking: req.session.messageBooking,
      });
      // res.send(doctor);
      //clear message
      req.session.messageBooking = null;
    } catch (err) {
      console.log(err);
    }
  }

  async searchAllDoctor(req, res, next) {
    let doctors = await getAllDoctorClinicAndReview();
    let listDoctorRender = [];
    for (let e of doctors) {
      e.clinicName = e["Clinic.name"];
      e.starNo = e["Reviews.starNo"];
      listDoctorRender.push(e);
    }
    console.log(listDoctorRender);

    res.render("user/searchAllDoctor", { listDoctorRender });
  }

  async searchAllClinic(req, res, next) {
    let clinics = await getAllClinic();
    console.log(clinics);

    res.render("user/searchAllClinic", { clinics });
  }
}
module.exports = new SiteController();
