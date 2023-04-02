const db = require('../models/index');
const { v4: uuidv4 } = require('uuid');

let findAllClinicAnDoctorWithClinic = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let clinics = await db.Clinic.findAll({
        raw: true,
      });

      let doctorsWithClinics = await db.User.findAll({
        where: { roleID: 2, status: 1 },
        raw: true,
        include: [
          {
            model: db.Clinic,
          },
        ],
      });
      if (doctorsWithClinics || clinics) {
        resolve([clinics, doctorsWithClinics]);
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getListClinics = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let listClinics = await db.Clinic.findAll({
        raw: true,
      });
      if (listClinics) {
        resolve(listClinics);
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getListClinicsDoctor = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let listClinics = await db.Clinic.findAll({
        raw: true,
        include: [
          {
            model: db.User,
            where: { clinicID: db.Clinic.id },
          },
        ],
      });
      if (listClinics) {
        resolve(listClinics);
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getClinicById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let clinic = await db.Clinic.findOne({
        where: { id: id },
        raw: true,
      });
      let doctors = await db.User.findAll({
        where: { clinicID: clinic.id },
        raw: true,
      });
      if (clinic) {
        resolve([clinic, doctors]);
      } else {
        resolve({});
      }
    } catch (e) {
      reject(e);
    }
  });
};

let createNewClinic = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let clinic = await db.Clinic.findOne({
        where: { name: data.name },
        raw: true,
      });
      if (clinic) {
        resolve('Khoa đã tồn tại');
      } else {
        await db.Clinic.create({
          id: uuidv4(),
          name: data.name,
          description: data.description,
          image: data.image,
        });
        resolve('Thêm thành công !');
      }
    } catch (e) {
      reject(e);
    }
  });
};

let updateClinic = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let clinic = await db.Clinic.findOne({
        where: { id: data.id },
      });
      if (clinic) {
        clinic.name = data.name;
        clinic.description = data.description;
        if (data.image != '') {
          clinic.image = data.image;
        }
        await clinic.save();
        resolve('Cập nhật thành công !'); //return
      } else {
        resolve(); //return
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteClinic = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let clinic = await db.Clinic.findOne({
        where: { id: id },
      });
      if (clinic) {
        await clinic.destroy();
        resolve('Xóa thành công !');
      } else {
        console.log('delete fail');
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  findAllClinicAnDoctorWithClinic,
  getListClinics,
  createNewClinic,
  updateClinic,
  getClinicById,
  deleteClinic,
  getListClinicsDoctor,
};
