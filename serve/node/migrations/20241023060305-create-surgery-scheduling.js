'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SurgerySchedulings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      OrderId: {
        type: Sequelize.INTEGER
      },
      Date: {
        type: Sequelize.DATE
      },
      Hour: {
        type: Sequelize.TIME
      },
      SurgeonA: {
        type: Sequelize.INTEGER
      },
      SurgeonB: {
        type: Sequelize.INTEGER
      },
      SurgeryLiquidationId: {
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
    await queryInterface.dropTable('SurgerySchedulings');
  }
};