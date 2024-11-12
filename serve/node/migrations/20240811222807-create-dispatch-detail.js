'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DispatchDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      DispatchId: {
        type: Sequelize.INTEGER
      },
      ProductId: {
        type: Sequelize.INTEGER
      },
      StatusId: {
        type: Sequelize.INTEGER
      },
      MedicineId: {
        type: Sequelize.INTEGER
      },
      OrderProductId: {
        type: Sequelize.INTEGER
      },
      cant: {
        type: Sequelize.INTEGER
      },
      available: {
        type: Sequelize.INTEGER
      },
      note: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('DispatchDetails');
  }
};