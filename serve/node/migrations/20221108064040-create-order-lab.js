'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderLabs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      AttentionId: {
        type: Sequelize.INTEGER
      },
      numberId: {
        type: Sequelize.BIGINT
      },
      date: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER
      },
      CupsListId: {
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
    await queryInterface.dropTable('OrderLabs');
  }
};