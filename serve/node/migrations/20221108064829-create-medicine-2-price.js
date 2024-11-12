'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Medicine2Prices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      marketId: {
        type: Sequelize.STRING
      },
      atcInvites: {
        type: Sequelize.STRING
      },
      activePrinciple: {
        type: Sequelize.STRING
      },
      pharmaceuticalForm: {
        type: Sequelize.STRING
      },
      unitValue: {
        type: Sequelize.FLOAT
      },
      unit: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Medicine2Prices');
  }
};