const bcrypt = require('bcryptjs');
const db = require('../models/index');
let salt = bcrypt.genSaltSync(5);
const { v4: uuidv4 } = require('uuid');

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, 5);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let getListAccounts = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let listClinics = await db.Clinic.findAll({ raw: true });
      let listUsers = await db.User.findAll({ raw: true });
      resolve([listUsers, listClinics]); // == return listUsers
    } catch (e) {
      reject(e);
    }
  });
};

//Create Account
let createNewAccount = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await hashUserPassword(data.password);

      let acc = await db.User.findOne({
        where: { email: data.email },
        raw: true,
      });
      if (acc) {
        resolve('Account exist');
      } else {
        const userId = uuidv4();
        let serviceId = null;
        let clinicId = null;
        let resumeId = null;
        let fee1 = null;
        if (data.roleID == 2) {
          clinicId = data.clinic;
          fee1 = data.fee;
          resumeId = uuidv4();
          serviceId = uuidv4();
          await db.Resume.create({ id: resumeId, title: '', description: '' });
        }
        await db.User.create({
          id: userId,
          email: data.email,
          password: hashPassword,
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
          phoneNumber: data.phoneNumber,
          address: data.address,
          roleID: data.roleID,
          status: 1,
          image:
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png',
          resumeID: resumeId,
          clinicID: clinicId,
        });
        if (data.roleID == 2) {
          await db.Service.create({ id: serviceId, UserId: userId, fee: fee1 });
        }

        resolve('Thêm thành công !');
      }
    } catch (e) {
      reject(e);
    }
  });
};
//Get account by id
let getAccountById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: id },
        raw: true,
      });
      let clinics = await db.Clinic.findAll({
        raw: true,
      });
      if (user) {
        if (user.roleID == 2) {
          let clinicOfDoctor = await db.Clinic.findOne({
            where: { id: user.clinicID },
            raw: true,
          });
          let serviceOfDoctor = await db.Service.findOne({
            where: { UserId: user.id },
          });
          resolve([user, clinicOfDoctor, clinics, serviceOfDoctor]);
        } else {
          resolve([user, '', clinics, '']);
        }
      } else {
        resolve({});
      }
    } catch (e) {
      reject(e);
    }
  });
};

//Update account
let updateAccount = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        let clinicId = null;
        let resumeId = null;
        if (data.roleID == 2) {
          clinicId = data.clinic;

          if (user.resumeID == null) {
            resumeId = uuidv4();
            await db.Resume.create({ id: resumeId, title: '', description: '' });
          }
        }
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.email = data.email;
        user.address = data.address;
        user.phoneNumber = data.phoneNumber;
        user.roleID = data.roleID;
        // user.status = 1;
        user.clinicID = clinicId;
        user.resumeID = resumeId;

        await user.save();

        if (data.roleID == 2) {
          let fee1 = data.fee;
          let service = await db.Service.findOne({
            where: { UserId: user.id },
          });
          if (service) {
            service.fee = fee1;
            await service.save();
          } else {
            await db.Service.create({ id: uuidv4(), UserId: user.id, fee: fee1 });
          }
        }
        resolve('Cập nhật thành công !'); //return
      } else {
        resolve(); //return
      }
    } catch (e) {
      reject(e);
    }
  });
};
//delete account
let deleteAcc = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: id },
      });
      if (user) {
        if (user.roleID === 1) {
          resolve('Không thể xóa tài khoản quản trị viên');
        } else {
          await user.destroy();
          resolve('Xóa thành công !');
        }
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};
//Change account status
let changeAccStatus = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let account = await db.User.findOne({
        where: { id: data.id },
      });
      if (account) {
        if (account.roleID == 2) {
          if (account.status == 0) {
            account.status = 1;
          } else if (account.status == 1) {
            account.status = 2;
          } else {
            account.status = 0;
          }
        } else {
          if (account.status == 1) {
            account.status = 0;
          } else {
            account.status = 1;
          }
        }
        await account.save();
        resolve();
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  getListAccounts,
  createNewAccount,
  updateAccount,
  getAccountById,
  deleteAcc,
  changeAccStatus,
};
