'use strict';
const { v4: uuidv4 } = require('uuid');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('appointments', [
      {
        id: '4ead8959-a751-4ca9-9c4f-d069504a3e15',
        userID: '364ddd65-7985-439f-93f4-05bc242bb42a',
        doctorID: '056d9b51-1719-4522-8102-37654b2a32d5',
        title: 'Khám răng định kỳ',
        date: new Date(),
        startTime: '13:00',
        endTime: '15:00',
        isCanceled: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'f3d6ca30-b922-421a-8a6e-62ecde70bd5f',
        userID: '364ddd65-7985-439f-93f4-05bc242bb42a',
        doctorID: '056d9b51-1719-4522-8102-37654b2a32d5',
        date: new Date(),
        title: 'Khám đau dạ dày',
        startTime: '08:00',
        endTime: '10:00',
        isCanceled: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('appointments', null, {});
  },
};
