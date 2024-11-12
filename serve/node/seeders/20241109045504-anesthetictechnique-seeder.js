module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('AnestheticTechniques', [
      { name: 'GENERAL INHALATORIA', createdAt: new Date(), updatedAt: new Date() },
      { name: 'INTRAVENOSA', createdAt: new Date(), updatedAt: new Date() },
      { name: 'RAQUIDEA', createdAt: new Date(), updatedAt: new Date() },
      { name: 'REGIONAL', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('AnestheticTechniques', null, {});
  }
};
