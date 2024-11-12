'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DentalMedicalHistories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numberId: {
        type: Sequelize.INTEGER
      },
      numberAttention: {
        type: Sequelize.BIGINT
      },
      diagnosis: {
        type: Sequelize.TEXT
      },
      date: {
        type: Sequelize.STRING
      },
      authorizationNumber: {
        type: Sequelize.STRING
      },
      socialSecurity: {
        type: Sequelize.STRING
      },
      dateAdmission: {
        type: Sequelize.STRING
      },
      time: {
        type: Sequelize.STRING
      },
      motive: {
        type: Sequelize.TEXT
      },
      observation: {
        type: Sequelize.TEXT
      },
      dentalHistory: {
        type: Sequelize.TEXT
      },
      medicalTreatment: {
        type: Sequelize.TEXT
      },
      pa: {
        type: Sequelize.STRING
      },
      fc: {
        type: Sequelize.STRING
      },
      fr: {
        type: Sequelize.STRING
      },
      temperature: {
        type: Sequelize.STRING
      },
      weight: {
        type: Sequelize.STRING
      },
      sp_t: {
        type: Sequelize.STRING
      },
      sdp: {
        type: Sequelize.STRING
      },
      result: {
        type: Sequelize.STRING
      },
      result1: {
        type: Sequelize.STRING
      },
      observation1: {
        type: Sequelize.TEXT
      },
      userId: {
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
    await queryInterface.dropTable('DentalMedicalHistories');
  }
};