'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bills', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER
      },
      AttentionId: {
        type: Sequelize.INTEGER
      },
      billNumber: {
        type: Sequelize.INTEGER
      },
      billExpeditionDate: {
        type: Sequelize.DATE
      },
      billDueDate: {
        type: Sequelize.DATE
      },
      payerName: {
        type: Sequelize.STRING
      },
      payerNit: {
        type: Sequelize.STRING
      },
      payerAddress: {
        type: Sequelize.STRING
      },
      payerPhone: {
        type: Sequelize.STRING
      },
      payerCity: {
        type: Sequelize.STRING
      },
      patientFullName:{
        type: Sequelize.STRING
      },
      patientNumberId: {
        type: Sequelize.STRING
      },
      patientTypeId: {
        type: Sequelize.STRING
      },
      patientAddress: {
        type: Sequelize.STRING
      },
      patientCity: {
        type: Sequelize.STRING
      },
      patientPhone: {
        type: Sequelize.STRING
      },
      serviceType: {
        type: Sequelize.STRING
      },
      entryDate: {
        type: Sequelize.DATE
      },
      billSubtotal: {
        type: Sequelize.INTEGER
      },
      billSubtotalLetters: {
        type: Sequelize.STRING
      },
      filingDate: {
        type: Sequelize.DATEONLY
      },
      filingHour: {
        type: Sequelize.TIME
      },
      filing: {
        type: Sequelize.STRING
      },
      DigitalSignatureId: {
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
    await queryInterface.dropTable('Bills');
  }
};