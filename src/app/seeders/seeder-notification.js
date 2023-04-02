'use strict';
const { v4: uuidv4 } = require('uuid');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('notifications', [
      // {
      //   id: uuidv4(),
      //   AppointmentId: "2e335d05-3704-4de8-a019-3cac4ae2af85",
      //   title: "Thông Báo Cuộc Hẹn",
      //   content:
      //     "Bạn đã đặt lịch thành công, bạn có thể vào mục lịch tư vấn để kiểm tra lịch hẹn !",
      //   link: "/user/schedule",
      //   fromUserID: "5b1aa055-6211-4e9f-8d09-ef6909ff1636",
      //   UserId: "2e8abec9-ad3e-4b8e-8b9c-415033cf7fb2",
      // },
      {
        id: '1e15544c-4141-4773-8296-06449d349077',
        AppointmentId: '4ead8959-a751-4ca9-9c4f-d069504a3e15',
        title: 'Thông Báo Lịch Hẹn',
        content: 'Vừa có lịch hẹn được đặt, bạn có thể kiểm tra lịch !',
        link: '/doctor/scheduleWork',
        fromUserID: '364ddd65-7985-439f-93f4-05bc242bb42a',
        UserId: '056d9b51-1719-4522-8102-37654b2a32d5',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'cdc6d87b-8ecd-4ad4-b6e8-e3738fc9f81e',
        AppointmentId: 'f3d6ca30-b922-421a-8a6e-62ecde70bd5f',
        title: 'Thông Báo Lịch Hẹn',
        content: 'Vừa có lịch hẹn được đặt, bạn có thể kiểm tra lịch !',
        link: '/doctor/scheduleWork',
        fromUserID: '364ddd65-7985-439f-93f4-05bc242bb42a',
        UserId: '056d9b51-1719-4522-8102-37654b2a32d5',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('notifications', null, {});
  },
};
