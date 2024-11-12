'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Furips', {
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

      //partA
      dateFiled: {
        type: Sequelize.STRING,
        allowNull: true
      },
      rg: {
        type: Sequelize.STRING,
        allowNull: true
      },
      previousFiledNumber: {
        type: Sequelize.STRING,
        allowNull: true
      },
      filedNumber: {
        type: Sequelize.STRING,
        allowNull: true
      },
      billNumber: {
        type: Sequelize.STRING,
        allowNull: true
      },
      providerBusinessName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      providerEnablementCode: {
        type: Sequelize.STRING,
        allowNull: true
      },
      providerNit: {
        type: Sequelize.STRING,
        allowNull: true
      },
      victimLastName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      victimSecondSurname: {
        type: Sequelize.STRING,
        allowNull: true
      },
      victimFirstName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      victimSecondName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      victimTypeId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      victimNumberId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      victimBirthDate: {
        type: Sequelize.STRING,
        allowNull: true
      },
      victimGender: {
        type: Sequelize.STRING,
        allowNull: true
      },
      victimAddress: {
        type: Sequelize.STRING,
        allowNull: true
      },
      victimState: {
        type: Sequelize.STRING,
        allowNull: true
      },
      victimStateCode: {
        type: Sequelize.STRING,
        allowNull: true
      },
      victimCity: {
        type: Sequelize.STRING,
        allowNull: true
      },
      victimCityCode: {
        type: Sequelize.STRING,
        allowNull: true
      },
      victimPhone: {
        type: Sequelize.STRING,
        allowNull: true
      },
      victimConditionInjured: {
        type: Sequelize.STRING,
        allowNull: true
      },
      siteAccidentNatureOfEvent: {
        type: Sequelize.STRING,
        allowNull: true
      },
      siteAccidentWhichOther: {
        type: Sequelize.STRING,
        allowNull: true
      },
      siteAccidentOccurrenceAddress: {
        type: Sequelize.STRING,
        allowNull: true
      },
      siteAccidentAccidentDate: {
        type: Sequelize.STRING,
        allowNull: true
      },
      siteAccidentAccidentTime: {
        type: Sequelize.STRING,
        allowNull: true
      },
      siteAccidentState: {
        type: Sequelize.STRING,
        allowNull: true
      },
      siteAccidentStateCode: {
        type: Sequelize.STRING,
        allowNull: true
      },
      siteAccidentCity: {
        type: Sequelize.STRING,
        allowNull: true
      },
      siteAccidentCityCode: {
        type: Sequelize.STRING,
        allowNull: true
      },
      siteAccidentZone: {
        type: Sequelize.STRING,
        allowNull: true
      },
      siteAccidentAccidentDescription: {
        type: Sequelize.STRING,
        allowNull: true
      },
      vehicleAccidentVehicleType: {
        type: Sequelize.STRING,
        allowNull: true
      },
      vehicleAccidentBrand: {
        type: Sequelize.STRING,
        allowNull: true
      },
      vehicleAccidentPlate: {
        type: Sequelize.STRING,
        allowNull: true
      },
      vehicleAccidentServiceType: {
        type: Sequelize.STRING,
        allowNull: true
      },
      vehicleAccidentInsuranceCode: {
        type: Sequelize.STRING,
        allowNull: true
      },
      vehicleAccidentPolicyNumber: {
        type: Sequelize.STRING,
        allowNull: true
      },
      vehicleAccidentValidSince: {
        type: Sequelize.STRING,
        allowNull: true
      },
      vehicleAccidentValidUntil: {
        type: Sequelize.STRING,
        allowNull: true
      },
      vehicleAccidentAuthorityIntervention: {
        type: Sequelize.STRING,
        allowNull: true
      },
      vehicleAccidentPolicySurplusCharge: {
        type: Sequelize.STRING,
        allowNull: true
      },
      vehicleOwnerLastName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      vehicleOwnerSecondSurname: {
        type: Sequelize.STRING,
        allowNull: true
      },
      vehicleOwnerFirstName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      vehicleOwnerSecondName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      vehicleOwnerTypeId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      vehicleOwnerNumberId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      vehicleOwnerAddress: {
        type: Sequelize.STRING,
        allowNull: true
      },
      vehicleOwnerState: {
        type: Sequelize.STRING,
        allowNull: true
      },
      vehicleOwnerStateCode: {
        type: Sequelize.STRING,
        allowNull: true
      },
      vehicleOwnerCity: {
        type: Sequelize.STRING,
        allowNull: true
      },
      vehicleOwnerCityCode: {
        type: Sequelize.STRING,
        allowNull: true
      },
      vehicleOwnerPhone: {
        type: Sequelize.STRING,
        allowNull: true
      },
      partATotalFolio: {
        type: Sequelize.STRING,
        allowNull: true
      },

      //PartB
       // Driver Vehicle
      driverVehicleLastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      driverVehicleSecondSurname: {
        type: Sequelize.STRING,
        allowNull: true
      },
      driverVehicleFirstName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      driverVehicleSecondName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      driverVehicleTypeId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      driverVehicleNumberId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      driverVehicleAddress: {
        type: Sequelize.STRING,
        allowNull: true
      },
      driverVehicleState: {
        type: Sequelize.STRING,
        allowNull: true
      },
      driverVehicleStateCode: {
        type: Sequelize.STRING,
        allowNull: true
      },
      driverVehicleCity: {
        type: Sequelize.STRING,
        allowNull: true
      },
      driverVehicleCityCode: {
        type: Sequelize.STRING,
        allowNull: true
      },
      driverVehiclePhone: {
        type: Sequelize.STRING,
        allowNull: true
      },

      // Remision
      referralType: {
        type: Sequelize.STRING,
        allowNull: true
      },
      referralDate: {
        type: Sequelize.STRING,
        allowNull: true
      },
      referralTime: {
        type: Sequelize.STRING,
        allowNull: true
      },
      referralProviderName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      referralProviderInscriptionCode: {
        type: Sequelize.STRING,
        allowNull: true
      },
      referralProviderProfessional: {
        type: Sequelize.STRING,
        allowNull: true
      },
      referralProviderProfessionalPosition: {
        type: Sequelize.STRING,
        allowNull: true
      },
      acceptanceDate: {
        type: Sequelize.STRING,
        allowNull: true
      },
      acceptanceTime: {
        type: Sequelize.STRING,
        allowNull: true
      },
      acceptanceProviderName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      acceptanceProviderInscriptionCode : {
        type: Sequelize.STRING,
        allowNull: true
      },
      acceptanceProviderProfessional: {
        type: Sequelize.STRING,
        allowNull: true
      },
      acceptanceProviderProfessionalPosition: {
        type: Sequelize.STRING,
        allowNull: true
      },

      // Protection Mobilization Victim
      protectionMobilizationVictimPlate: {
        type: Sequelize.STRING,
        allowNull: true
      },
      protectionMobilizationVictimTransportVictimFrom: {
        type: Sequelize.STRING,
        allowNull: true
      },
      protectionMobilizationVictimTransportVictimSince: {
        type: Sequelize.STRING,
        allowNull: true
      },
      protectionMobilizationVictimTransportationType: {
        type: Sequelize.STRING,
        allowNull: true
      },
      protectionMobilizationVictimPlace: {
        type: Sequelize.STRING,
        allowNull: true
      },

      // Certificate Medical Care Victim
      certificateMedicalCareVictimEntryDate: {
        type: Sequelize.STRING,
        allowNull: true
      },
      certificateMedicalCareVictimEntryTime: {
        type: Sequelize.STRING,
        allowNull: true
      },
      certificateMedicalCareVictimDiagnosesPrincipalCIE10: {
        type: Sequelize.STRING,
        allowNull: true
      },
      certificateMedicalCareVictimDiagnosesRelated1CIE10: {
        type: Sequelize.STRING,
        allowNull: true
      },
      certificateMedicalCareVictimDiagnosesRelated2CIE10: {
        type: Sequelize.STRING,
        allowNull: true
      },
      certificateMedicalCareVictimEgressDate: {
        type: Sequelize.STRING,
        allowNull: true
      },
      certificateMedicalCareVictimEgressTime: {
        type: Sequelize.STRING,
        allowNull: true
      },
      certificateMedicalCareVictimEgressDiagnosesPrincipalCIE10: {
        type: Sequelize.STRING,
        allowNull: true
      },
      certificateMedicalCareVictimEgressDiagnosesRelated1CIE10: {
        type: Sequelize.STRING,
        allowNull: true
      },
      certificateMedicalCareVictimEgressDiagnosesRelated2CIE10: {
        type: Sequelize.STRING,
        allowNull: true
      },
      certificateMedicalCareVictimTreatingProfessionalLastName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      certificateMedicalCareVictimTreatingProfessionalSecondSurname: {
        type: Sequelize.STRING,
        allowNull: true
      },
      certificateMedicalCareVictimTreatingProfessionalFirstName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      certificateMedicalCareVictimTreatingProfessionalSecondName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      certificateMedicalCareVictimTreatingProfessionalTypeId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      certificateMedicalCareVictimTreatingProfessionalNumberId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      certificateMedicalCareVictimTreatingProfessionalMedRecord: {
        type: Sequelize.STRING,
        allowNull: true
      },
      certificateMedicalCareVictimSurgicalMedicalExpensesBilled: {
        type: Sequelize.STRING,
        allowNull: true
      },
      certificateMedicalCareVictimSurgicalMedicalExpensesFosyga: {
        type: Sequelize.STRING,
        allowNull: true
      },
      certificateMedicalCareVictimMobilizationExpensesBilled: {
        type: Sequelize.STRING,
        allowNull: true
      },
      certificateMedicalCareVictimMobilizationExpensesFosyga: {
        type: Sequelize.STRING,
        allowNull: true
      },

      // Provider Health
      providerHealthName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      providerHealthSignature: {
        type: Sequelize.STRING,
        allowNull: true
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
    await queryInterface.dropTable('Furips');
  }
};