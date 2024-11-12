'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ClinicHistories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      //info person
    HistoryPersonId: {
        type: Sequelize.INTEGER
      },
      numberId: {
        type: Sequelize.BIGINT
      },
      //info clinic history


      AttentionId: {
        type: Sequelize.BIGINT
      },
      UserId: {
        type: Sequelize.INTEGER
      },
      assignedCenter:{
        type: Sequelize.STRING        
      },
      date: {
        type: Sequelize.DATEONLY
      },
      time: {
        type: Sequelize.TIME
      },

      //info medica

      diagnosis: {
        type: Sequelize.TEXT
      },
      observation: {
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
    await queryInterface.dropTable('ClinicHistories');
  }
};