'use strict';
const { v4: uuidv4 } = require('uuid');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('clinics', [
      {
        id: '5cb5fa00-4bd6-40ac-a1c6-0b32b789cabc',
        name: 'Khoa Sản',
        description: 'Sinh Sản Sinh Đẻ',
        image: 'khoa-san.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '26d30a14-dadf-49fe-a168-bd4efb5ea97b',
        name: 'Khoa Mắt',
        description: 'Chăm Sóc Mắt Bệnh Nhân',
        image: 'khoa-mat.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'd5b8918c-eb82-455a-a1dd-f99c28df5d17',
        name: 'Khoa Răng Hàm Mặt',
        description: 'Chắm Sóc Hàm Răng Của Bạn Như Chén Bát Nhà Tôi',
        image: 'khoa-tai-mui-hong.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'a97e854d-42fe-466f-b077-5194a4ff4bd6',
        name: 'Khoa Tai Mũi Họng',
        description: 'Tai Mũi Họng Nè Mấy Chú',
        image: 'khoa-rang-ham-mat.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('clinics', null, {});
  },
};
