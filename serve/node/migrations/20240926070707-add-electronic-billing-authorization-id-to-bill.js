module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Bills', 'ElectronicBillingAuthorizationId', {
      type: Sequelize.INTEGER
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Bills', 'ElectronicBillingAuthorizationId');
  }
};
