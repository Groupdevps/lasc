'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SOATs', {
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
      injuredPersonFullname: {
        type: Sequelize.STRING
      },
      injuredPersonAdmissionDate: {
        type: Sequelize.STRING
      },
      injuredPersonAdmissionTime: {
        type: Sequelize.STRING
      },
      injuredPersonNumberId: {
        type: Sequelize.STRING
      },
      injuredPersonTypeId: {
        type: Sequelize.STRING
      },
      injuredPersonIssued: {
        type: Sequelize.STRING
      },
      injuredPersonGender: {
        type: Sequelize.STRING
      },
      injuredPersonBirthDate: {
        type: Sequelize.STRING
      },
      injuredPersonAge: {
        type: Sequelize.STRING
      },
      injuredPersonSocialInsurance: {
        type: Sequelize.STRING
      },
      injuredPersonAddress: {
        type: Sequelize.STRING
      },
      injuredPersonState: {
        type: Sequelize.STRING
      },
      injuredPersonCity: {
        type: Sequelize.STRING
      },
      injuredPersonDistrict: {
        type: Sequelize.STRING
      },
      injuredPersonPhone: {
        type: Sequelize.STRING
      },
      injuredPersonCellphone: {
        type: Sequelize.STRING
      },
      injuredPersonProfession: {
        type: Sequelize.STRING
      },
      injuredPersonMaritalStatus: {
        type: Sequelize.STRING
      },
      injuredPersonCompanion: {
        type: Sequelize.STRING
      },
      injuredPersonRelationship: {
        type: Sequelize.STRING
      },
      responsibleInsuranceCarrier: {
        type: Sequelize.STRING
      },
      responsibleAdmissionist: {
        type: Sequelize.STRING
      },
      responsibleOriginSelected: {
        type: Sequelize.STRING
      },
      responsibleOriginName: {
        type: Sequelize.STRING
      },
      accidentInjuredCondition: {
        type: Sequelize.STRING
      },
      accidentAddress: {
        type: Sequelize.STRING
      },
      accidentDate: {
        type: Sequelize.STRING
      },
      accidentTime: {
        type: Sequelize.STRING
      },
      accidentState: {
        type: Sequelize.STRING
      },
      accidentCity: {
        type: Sequelize.STRING
      },
      accidentZone: {
        type: Sequelize.STRING
      },
      accidentReport: {
        type: Sequelize.TEXT
      },
      accidentVehicleBrand: {
        type: Sequelize.STRING
      },
      accidentVehiclePlate: {
        type: Sequelize.STRING
      },
      accidentVehicleType: {
        type: Sequelize.STRING
      },
      accidentVehicleInsured: {
        type: Sequelize.STRING
      },
      accidentDriverPatient: {
        type: Sequelize.STRING
      },
      accidentDriverName: {
        type: Sequelize.STRING
      },
      accidentDriverNumberId: {
        type: Sequelize.STRING
      },
      accidentDriverTypeId: {
        type: Sequelize.STRING
      },
      accidentDriverIssued: {
        type: Sequelize.STRING
      },
      accidentDriverAddress: {
        type: Sequelize.STRING
      },
      accidentDriverCity: {
        type: Sequelize.STRING
      },
      accidentDriverCellphone: {
        type: Sequelize.STRING
      },
      signature: {
        type: Sequelize.STRING
      },
      fingerprint: {
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
    await queryInterface.dropTable('SOATs');
  }
};