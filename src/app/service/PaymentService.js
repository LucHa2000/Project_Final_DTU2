const paypal = require('paypal-rest-sdk');
const db = require('../models/index');
const UserService = require('./UserService');
const sampleService = require('./SampleService');

let updateAccountBalance = (id, amount) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: id },
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

module.exports = {
  updateAccountBalance,
};
