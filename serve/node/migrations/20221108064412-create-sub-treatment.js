'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SubTreatments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      AttentionId: {
        type: Sequelize.INTEGER
      },
      CupsListId: {
        type: Sequelize.INTEGER
      },
      MedicalFormulaId: {
        type: Sequelize.INTEGER
      },
      TreatmentListId: {
        type: Sequelize.INTEGER
      },
      OrderLabId: {
        type: Sequelize.INTEGER
      },
      DiagnosticAidId: {
        type: Sequelize.INTEGER
      },
      treatment: {
        type: Sequelize.TEXT
      },
      date: {
        type: Sequelize.DATEONLY
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
    await queryInterface.dropTable('SubTreatments');
  }
};