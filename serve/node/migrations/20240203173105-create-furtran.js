'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Furtrans', {
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
      deadline: {
        type: Sequelize.STRING
      },
      rg: {
        type: Sequelize.STRING
      },
      previousFilingNumber: {
        type: Sequelize.STRING
      },
      filingNumber: {
        type: Sequelize.STRING
      },
      transporterName: {
        type: Sequelize.STRING
      },
      transporterEnableCode: {
        type: Sequelize.STRING
      },
      transporterLastName: {
        type: Sequelize.STRING
      },
      transporterSecondSurname: {
        type: Sequelize.STRING
      },
      transporterFirstName: {
        type: Sequelize.STRING
      },
      transporterSecondName: {
        type: Sequelize.STRING
      },
      transporterTypeId: {
        type: Sequelize.STRING
      },
      transporterNumberId: {
        type: Sequelize.STRING
      },
      transporterServiceType: {
        type: Sequelize.STRING
      },
      transporterPersonServiceType: {
        type: Sequelize.STRING
      },
      transporterPersonWhich:{
        type: Sequelize.STRING
      },
      transporterPlate: {
        type: Sequelize.STRING
      },
      transporterAddress: {
        type: Sequelize.STRING
      },
      transporterPhone: {
        type: Sequelize.STRING
      },
      transporterStateName: {
        type: Sequelize.STRING
      },
      transporterStateCode: {
        type: Sequelize.STRING
      },
      transporterCityName: {
        type: Sequelize.STRING
      },
      transporterCityCode: {
        type: Sequelize.STRING
      },
      transferredVictimsTypeId: {
        type: Sequelize.STRING
      },
      transferredVictimsNumberId: {
        type: Sequelize.STRING
      },
      transferredVictimsFirstName: {
        type: Sequelize.STRING
      },
      transferredVictimsSecondName: {
        type: Sequelize.STRING
      },
      transferredVictimsLastName: {
        type: Sequelize.STRING
      },
      transferredVictimsSecondSurname: {
        type: Sequelize.STRING
      },
      transferredVictimsEventType: {
        type: Sequelize.STRING
      },
      transferredVictimsEventOthers: {
        type: Sequelize.STRING
      },
      pickUpPlaceAddress: {
        type: Sequelize.STRING
      },
      pickUpPlaceStateName: {
        type: Sequelize.STRING
      },
      pickUpPlaceStateCode: {
        type: Sequelize.STRING
      },
      pickUpPlaceCityName: {
        type: Sequelize.STRING
      },
      pickUpPlaceCityCode: {
        type: Sequelize.STRING
      },
      pickUpPlaceZone: {
        type: Sequelize.STRING
      },
      certificationDate: {
        type: Sequelize.STRING
      },
      certificationTime: {
        type: Sequelize.STRING
      },
      certificationCenterName: {
        type: Sequelize.STRING
      },
      certificationCenterNit: {
        type: Sequelize.STRING
      },
      certificationCenterCode: {
        type: Sequelize.STRING
      },
      certificationCenterAddress: {
        type: Sequelize.STRING
      },
      certificationCenterStateName: {
        type: Sequelize.STRING
      },
      certificationCenterStateCode: {
        type: Sequelize.STRING
      },
      certificationCenterCityName: {
        type: Sequelize.STRING
      },
      certificationCenterCityCode: {
        type: Sequelize.STRING
      },
      certificationCenterPhone: {
        type: Sequelize.STRING
      },
      certificationCenterManagerName: {
        type: Sequelize.STRING
      },
      certificationCenterManagerSignature: {
        type: Sequelize.STRING
      },
      certificationCenterManagerTypeId: {
        type: Sequelize.STRING
      },
      certificationCenterManagerNumberId: {
        type: Sequelize.STRING
      },
      certificationTransporterSignature: {
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
    await queryInterface.dropTable('Furtrans');
  }
};