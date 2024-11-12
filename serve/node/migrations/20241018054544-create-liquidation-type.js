'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LiquidationTypes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      SurgeryLiquidationId: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      No: {
        type: Sequelize.INTEGER
      },
      ServiceId: {
        type: Sequelize.INTEGER
      },
      ManualTypeId: {
        type: Sequelize.INTEGER
      },
      percentage: {
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
    await queryInterface.dropTable('LiquidationTypes');
  }
};