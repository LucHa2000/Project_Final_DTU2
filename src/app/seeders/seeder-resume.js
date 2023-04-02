'use strict';
const { v4: uuidv4 } = require('uuid');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('resumes', [
      {
        id: '4f382500-8696-4d34-b025-39e0a598cfc6',
        starNo: 5,
        title: 'Bác sĩ Mark Lee - Người truyền cảm hứng cho thế hệ trẻ',
        description:
          'Tôi là người hiện đang sinh sống và làm việc tại Việt Nam đã được 10 năm, với kinh nghiệm chuyên sâu về răng hàm mặt, tôi tin sẽ đem lại cho bạn dịch vụ tốt nhất.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '90c77b8d-52a1-4cd7-97e2-dd1e4752b5a1',
        starNo: 5,
        title: '',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3da7f630-67e4-4855-8b58-71619563befc',
        starNo: 4,
        title: '',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'f508167d-4475-492e-84dc-7381363b1a23',
        starNo: 3,
        title: '',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'c1972883-9bd8-4996-882e-0cd6353b09cd',
        starNo: 4,
        title: '',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'd808d1a2-9453-4529-b196-36b3147477c6',
        starNo: 5,
        title: '',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '9b46672e-1483-43ea-9892-66ddfddfbeba',
        starNo: 3,
        title: '',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '210a9909-ca28-48b3-b8bf-8fc98cbc3e81',
        starNo: 5,
        title: 'John David - Chuyên khoa tai mũi họng',
        description:
          'Chào bạn, tôi là John David, tôi sinh ra và lớn lên ở California, hiện tôi đã làm việc và sinh sống ở Việt Nam 15 năm. Tôi tin rằng, với kinh nghiệm làm việc 10 năm ở mảng tai mũi họng, sẽ mang lại cho bạn trải nghiệm tốt nhất.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('resumes', null, {});
  },
};
