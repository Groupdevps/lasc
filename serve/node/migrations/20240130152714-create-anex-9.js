'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Anex9s', {
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
      date: {
        type: Sequelize.STRING
      },
      time: {
        type: Sequelize.STRING
      },
      providerName: {
        type: Sequelize.STRING
      },
      providerTypeId: {
        type: Sequelize.STRING
      },
      providerNumberId: {
        type: Sequelize.STRING
      },
      providerCode: {
        type: Sequelize.STRING
      },
      providerAddress: {
        type: Sequelize.STRING
      },
      providerPhoneCode: {
        type: Sequelize.STRING
      },
      providerPhoneNumber: {
        type: Sequelize.STRING
      },
      providerState: {
        type: Sequelize.STRING
      },
      providerCity: {
        type: Sequelize.STRING
      },
      patientFullName: {
        type: Sequelize.STRING
      },
      patientTypeId: {
        type: Sequelize.STRING
      },
      patientNumberId: {
        type: Sequelize.STRING
      },
      patientBirthDate: {
        type: Sequelize.STRING
      },
      patientAddress: {
        type: Sequelize.STRING
      },
      patientPhone: {
        type: Sequelize.STRING
      },
      patientState: {
        type: Sequelize.STRING
      },
      patientCity: {
        type: Sequelize.STRING
      },
      patientServiceProviderName: {
        type: Sequelize.STRING
      },
      patientServiceProviderCode: {
        type: Sequelize.STRING
      },
      tutorFullName: {
        type: Sequelize.STRING
      },
      tutorTypeId: {
        type: Sequelize.STRING
      },
      tutorNumberId: {
        type: Sequelize.STRING
      },
      tutorBirthDate: {
        type: Sequelize.STRING
      },
      tutorAddress: {
        type: Sequelize.STRING
      },
      tutorPhone: {
        type: Sequelize.STRING
      },
      tutorState: {
        type: Sequelize.STRING
      },
      tutorCity: {
        type: Sequelize.STRING
      },
      personRequestingFullName: {
        type: Sequelize.STRING
      },
      personRequestingPhoneCode: {
        type: Sequelize.STRING
      },
      personRequestingPhoneNumber: {
        type: Sequelize.STRING
      },
      personRequestingPhoneExtension: {
        type: Sequelize.STRING
      },
      personRequestingCellphone: {
        type: Sequelize.STRING
      },
      ServiceRequesting: {
        type: Sequelize.STRING
      },
      ServiceReferenceRequested: {
        type: Sequelize.STRING
      },
      relevantClinicalInformation: {
        type: Sequelize.TEXT
      },
      professionalSignature: {
        type: Sequelize.STRING
      },
      professionalRegistrationNumber: {
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
    await queryInterface.dropTable('Anex9s');
  }
};