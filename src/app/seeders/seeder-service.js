'use strict';
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
let salt = 5;

// let hashUserPassword = (password) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let hashPassword = await bcrypt.hashSync(password, salt);
//       resolve(hashPassword);
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('services', [
      {
        id: uuidv4(),
        UserId: 'af3a5b71-9aab-4ea7-8ce8-13103e7414c3',
        fee: 25,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        UserId: 'd19e6ccc-5b7d-4a8d-8abd-c9ac5b544a5b',
        fee: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        UserId: '056d9b51-1719-4522-8102-37654b2a32d5',
        fee: 25,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        UserId: 'e9e46bca-00d6-4b7b-93e3-078e0007d178',
        fee: 25,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        UserId: 'baa5d8cf-33d1-4083-8fb0-7a853339609b',
        fee: 25,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        UserId: 'd3b5ffe3-57c2-4de1-8710-bd703be5fba7',
        fee: 25,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        UserId: '39d76f38-4123-4c04-80ba-500ad103bc84',
        fee: 25,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('services', null, {});
  },
};
