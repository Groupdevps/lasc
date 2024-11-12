'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Qxes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      startDate: {
        type: Sequelize.DATEONLY
      },
      startTime: {
        type: Sequelize.TIME
      },
      endDate: {
        type: Sequelize.DATEONLY
      },
      endTime: {
        type: Sequelize.TIME
      },
      surgeonId: {
        type: Sequelize.INTEGER
      },
      anesthesiologistId: {
        type: Sequelize.INTEGER
      },
      instrumenterId: {
        type: Sequelize.INTEGER
      },
      assistantId: {
        type: Sequelize.INTEGER
      },
      AnestheticTechniqueId: {
        type: Sequelize.INTEGER
      },
      
      description: {
        type: Sequelize.TEXT
      },
      UserId: {
        type: Sequelize.INTEGER
      },
      AttentionId: {
        type: Sequelize.INTEGER
      },
      OrderId : {
        type: Sequelize.INTEGER
      },
      PersonId: {
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
    await queryInterface.dropTable('Qxes');
  }
};