const bcrypt = require("bcryptjs");
const db = require("../models/index");
let salt = bcrypt.genSaltSync(5);
const nodemailer = require("nodemailer"); //sendEmailConfirm

let sendMail = (receiverEmail, senderEmail, senderPassword, content) => {
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: senderEmail,
      pass: senderPassword,
    },
  });
  var mailMessage = {
    from: senderEmail,
    to: receiverEmail,
    subject: "Confirm Email",
    text: `This is Email Confirm Code ! 
       Your code : ${content} 
      `,
  };
  transporter.sendMail(mailMessage, function (error, data) {});
};

let compareUserPass = (password, hash) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.compareSync(password, hash);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

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

let getUserByEmailAndPassword = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: email },
        raw: true,
      });
      let comparePassword = await compareUserPass(
        password.trim(),
        user.password
      );
      if (user && comparePassword) {
        resolve(user);
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getUserByEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: email },
        raw: true,
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

let getUserByName = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { name: name },
        raw: true,
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

let getListUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let listUsers = await db.User.findAll({ raw: true });
      resolve(listUsers); // == return listUsers
    } catch (e) {
      reject(e);
    }
  });
};
let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await hashUserPassword(data.password);

      await db.User.create({
        id: data.id,
        email: data.email,
        password: hashPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        roleID: 3,
        image: "cc38cdf86cad599284b94973a9444b65",
        balance: 0,
        status: 0,
      });

      resolve("add successfully !");
    } catch (e) {
      reject(e);
    }
  });
};

let getUserById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: id },
        raw: true,
      });
      if (user) {
        resolve(user);
      } else {
        resolve({});
      }
    } catch (e) {
      reject(e);
    }
  });
};
let updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.phoneNumber = data.phoneNumber;
        user.gender = data.gender;
        //user.roleID = data.roleID;
        if (data.image != "") {
          user.image = data.image;
        }
        await user.save();
        resolve("update done !"); //return
      } else {
        resolve(); //return
      }
    } catch (e) {
      reject(e);
    }
  });
};
let updatePassword = (email, newPassword) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: email.trim() },
      });
      if (user) {
        user.password = await hashUserPassword(newPassword);
        await user.save();
        resolve("update password successfully !"); //return
      } else {
        resolve(); //return
      }
    } catch (e) {
      reject(e);
    }
  });
};
let deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: id },
      });
      if (user) {
        await user.destroy();
      }
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
let addBalanceById = (id, amount) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: id },
        // raw: true
      });
      if (user) {
        user.balance = user.balance + amount;
        await user.save();
        resolve(); //return
      } else {
        resolve(); //return
      }
    } catch (e) {
      reject(e);
    }
  });
};

let minusBalanceById = (id, amount) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: id },
        // raw: true
      });
      if (user) {
        user.balance = user.balance - amount;
        await user.save();
        resolve(); //return
      } else {
        resolve(); //return
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createNewUser: createNewUser,
  getListUsers: getListUsers,
  getUserById,
  deleteUser,
  updateUser,
  getUserByEmailAndPassword,
  compareUserPass,
  getUserByEmail,
  sendMail,
  getUserByName,
  updatePassword,
  minusBalanceById,
  addBalanceById,
};
