'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ManualTypes', [
      {
        name: 'ISS 2001',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'ISS 2004',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'SOAT',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ManualTypes', {
      name: ['ISS 2001', 'ISS 2004', 'SOAT']
    }, {});
  }
};
