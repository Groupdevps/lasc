'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('ElectronicBillingAuthorizations', 'LastInvoiceNumber', {
      type: Sequelize.INTEGER
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('ElectronicBillingAuthorizations', 'LastInvoiceNumber');
  }
};
