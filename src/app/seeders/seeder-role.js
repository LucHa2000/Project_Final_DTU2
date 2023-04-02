'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('roles', [
      {
        name: 'Admin',
        permissionID: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Doctor',
        permissionID: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'User',
        permissionID: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('roles', null, {});
  },
};
