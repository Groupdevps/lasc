'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ElectronicBillingAuthorizations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      authorizationNumber: {
        type: Sequelize.STRING
      },
      authorizationDate: {
        type: Sequelize.DATEONLY
      },
      from: {
        type: Sequelize.INTEGER
      },
      to: {
        type: Sequelize.INTEGER
      },
      prefix: {
        type: Sequelize.STRING
      },
      initialInvoiceNumber: {
        type: Sequelize.INTEGER
      },
      CenterId: {
        type: Sequelize.INTEGER
      },
      active: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ElectronicBillingAuthorizations');
  }
};