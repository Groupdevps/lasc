'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Satisfactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      AttentionId: {
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER
      },
      patientFullName: {
        type: Sequelize.STRING
      },
      admissionNumber: {
        type: Sequelize.STRING
      },
      epr: {
        type: Sequelize.STRING
      },
      admissionDate: {
        type: Sequelize.STRING
      },
      departureDate: {
        type: Sequelize.STRING
      },
      signature: {
        type: Sequelize.STRING
      },
      fingerprint: {
        type: Sequelize.STRING
      },
      numberId: {
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
    await queryInterface.dropTable('Satisfactions');
  }
};