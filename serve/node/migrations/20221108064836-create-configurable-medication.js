'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ConfigurableMedications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      vat: {
        type: Sequelize.STRING
      },
      purchaseValue: {
        type: Sequelize.STRING
      },
      purchaseValue2: {
        type: Sequelize.STRING
      },
      units: {
        type: Sequelize.STRING
      },
      saleByEps: {
        type: Sequelize.STRING
      },
      hourValue: {
        type: Sequelize.STRING
      },
      halfHourValue: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('ConfigurableMedications');
  }
};