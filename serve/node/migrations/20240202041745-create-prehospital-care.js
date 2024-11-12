'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PrehospitalCares', {
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
      code: {
        type: Sequelize.STRING
      },
      version: {
        type: Sequelize.STRING
      },
      approvalDate: {
        type: Sequelize.STRING
      },
      page: {
        type: Sequelize.STRING
      },
      number: {
        type: Sequelize.STRING
      },
      plates: {
        type: Sequelize.STRING
      },
      centerName: {
        type: Sequelize.STRING
      },
      mobile: {
        type: Sequelize.STRING
      },
      attentionDate: {
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
      patientAge: {
        type: Sequelize.STRING
      },
      patientBirthDate: {
        type: Sequelize.STRING
      },
      patientGender: {
        type: Sequelize.STRING
      },
      patientMaritalStatus: {
        type: Sequelize.STRING
      },
      patientServiceProvider: {
        type: Sequelize.STRING
      },
      patientAddress: {
        type: Sequelize.STRING
      },
      patientDistrict: {
        type: Sequelize.STRING
      },
      patientCellphone: {
        type: Sequelize.STRING
      },
      patientCompanion: {
        type: Sequelize.STRING
      },
      patientCompanionRelationship: {
        type: Sequelize.STRING
      },
      patientCompanionCellphone: {
        type: Sequelize.STRING
      },
      transferTypeBasic: {
        type: Sequelize.STRING
      },
      transferTypeMedicalized: {
        type: Sequelize.STRING
      },
      accidentDateTime: {
        type: Sequelize.STRING
      },
      originDisplacement: {
        type: Sequelize.STRING
      },
      originArrivalTime: {
        type: Sequelize.STRING
      },
      destinationDisplacement: {
        type: Sequelize.STRING
      },
      destinationArrivalTime: {
        type: Sequelize.STRING
      },
      serviceTypeDouble: {
        type: Sequelize.STRING
      },
      serviceTypeSimple: {
        type: Sequelize.STRING
      },
      transferReason: {
        type: Sequelize.STRING
      },
      patientStatus: {
        type: Sequelize.STRING
      },
      vitalSignsFc: {
        type: Sequelize.STRING
      },
      vitalSignsFr: {
        type: Sequelize.STRING
      },
      vitalSignsTa: {
        type: Sequelize.STRING
      },
      vitalSignsSoz: {
        type: Sequelize.STRING
      },
      vitalSignsGlasglow: {
        type: Sequelize.STRING
      },
      supportsOxygen: {
        type: Sequelize.STRING
      },
      supportsLev: {
        type: Sequelize.STRING
      },
      supportsPeep: {
        type: Sequelize.STRING
      },
      supportsFr: {
        type: Sequelize.STRING
      },
      supportsFioz: {
        type: Sequelize.STRING
      },
      background: {
        type: Sequelize.STRING
      },
      traumaLocation: {
        type: Sequelize.STRING
      },
      transferEndPatientStatus: {
        type: Sequelize.STRING
      },
      signatureCenter: {
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
    await queryInterface.dropTable('PrehospitalCares');
  }
};