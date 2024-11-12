'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Zones', [
      { name: 'URBANA', active: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'RURAL', active: true, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Zones', { name: ['URBANA', 'RURAL'] }, {});

  }
};
