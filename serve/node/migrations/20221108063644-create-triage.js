'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Triages', {
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

      //info triage
      AttentionId: {
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER
      },
      userPosition :{
        type: Sequelize.STRING        
      }, 
      LevelTriageId: {
        type: Sequelize.INTEGER
      },
      assignedAdministrator: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATEONLY
      },
      time: {
        type: Sequelize.TIME
      },

      //info medic

      HistoryInfoMedicPersonId: {
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
    await queryInterface.dropTable('Triages');
  }
};