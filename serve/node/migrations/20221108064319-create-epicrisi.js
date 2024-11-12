'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Epicrisis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      AttentionId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      HistoryPersonId: {
        type: Sequelize.INTEGER
      },
      EmergencyMedicalHistoryId: {
        type: Sequelize.INTEGER
      },
      admissionDate: {
        type: Sequelize.DATE
      },
      egressDate: {
        type: Sequelize.DATE
      },
      duration: {
        type: Sequelize.STRING
      },
      motive: {
        type: Sequelize.TEXT
      },
      justification: {
        type: Sequelize.TEXT
      },
      plan: {
        type: Sequelize.TEXT
      },
      MedicineId: {
        type: Sequelize.INTEGER
      },
      UserId: {
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
    await queryInterface.dropTable('Epicrisis');
  }
};