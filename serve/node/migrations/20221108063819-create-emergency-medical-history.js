'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EmergencyMedicalHistories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numberId: {
        type: Sequelize.BIGINT
      },

      //relations

      AttentionId: {
        type: Sequelize.BIGINT
      },
      UserId: {
        type: Sequelize.INTEGER
      },
      HistoryPersonId: {
        type: Sequelize.INTEGER
      },
      HistoryInfoMedicPersonId: {
        type: Sequelize.INTEGER
      },


      //data only emergenci medical history

     
      observations: {
        type: Sequelize.TEXT
      },
      paraclinical: {
        type: Sequelize.TEXT
      },
      diagnosticImpression: {
        type: Sequelize.TEXT
      },
      plan: {
        type: Sequelize.TEXT
      },
      familyBackground: {
        type: Sequelize.TEXT
      },
      assignedDate: {
        type: Sequelize.DATEONLY
      },
      authorizationNumber: {
        type: Sequelize.STRING
      },
      hour: {
        type: Sequelize.TIME
      },
      typeAttention: {
        type: Sequelize.STRING
      },

      //intrinsecos
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
    await queryInterface.dropTable('EmergencyMedicalHistories');
  }
};