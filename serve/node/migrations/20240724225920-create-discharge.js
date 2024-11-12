'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Discharges', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      weight: {
        type: Sequelize.INTEGER
      },
      size: {
        type: Sequelize.INTEGER
      },
      arterialTsn: {
        type: Sequelize.STRING
      },
      cardiacFr: {
        type: Sequelize.INTEGER
      },
      respiratoryFr: {
        type: Sequelize.INTEGER
      },
      pulse: {
        type: Sequelize.INTEGER
      },
      temperature: {
        type: Sequelize.FLOAT
      },
      eyeOpening: {
        type: Sequelize.INTEGER
      },
      verbalResponse: {
        type: Sequelize.INTEGER
      },
      motorResponse: {
        type: Sequelize.INTEGER
      },
      generalConditionsUponDeparture: {
        type: Sequelize.TEXT
      },
      headAndNeck: {
        type: Sequelize.TEXT
      },
      chest: {
        type: Sequelize.TEXT
      },
      abdomen: {
        type: Sequelize.TEXT
      },
      extremities: {
        type: Sequelize.TEXT
      },
      neurological: {
        type: Sequelize.TEXT
      },
      genitourinary: {
        type: Sequelize.TEXT
      },
      evolutions: {
        type: Sequelize.TEXT
      },
      hospitalizationJustification: {
        type: Sequelize.TEXT
      },
      orders: {
        type: Sequelize.TEXT
      },
      mainDischargeDiagnosis: {
        type: Sequelize.INTEGER
      },
      diagnosis1Discharge: {
        type: Sequelize.INTEGER
      },
      diagnosis2Discharge: {
        type: Sequelize.INTEGER
      },
      diagnosis3Discharge: {
        type: Sequelize.INTEGER
      },
      consultationSPurpose: {
        type: Sequelize.STRING
      },
      externalCause: {
        type: Sequelize.STRING
      },
      departureReason: {
        type: Sequelize.STRING
      },
      exitStatus: {
        type: Sequelize.STRING
      },
      AttentionId: {
        type: Sequelize.INTEGER
      },
      PersonId: {
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
    await queryInterface.dropTable('Discharges');
  }
};