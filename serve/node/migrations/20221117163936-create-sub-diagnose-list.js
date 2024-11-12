'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SubDiagnoseLists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        
        type: Sequelize.DATEONLY
      },

      SubDiagnoseId: {
        type: Sequelize.INTEGER
      },
      ClinicHistoryId: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      MedicalOrderId: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      EmergencyMedicalHistoryId: {
        type: Sequelize.INTEGER
      },
      MedicalFormulaId: {
        type: Sequelize.INTEGER
      },
      OutpatientOrderId: {
        type: Sequelize.INTEGER
      },
      OrderLabId: {
        type: Sequelize.INTEGER
      },
      DiagnosticAidId: {
        type: Sequelize.INTEGER
      },
      EvolutionNoteId: {
        type: Sequelize.INTEGER
      },
      EpicrisiId: {
        type: Sequelize.INTEGER
      },
      AttentionId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      repeated: {
        type: Sequelize.BOOLEAN

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
    await queryInterface.dropTable('SubDiagnoseLists');
  }
};