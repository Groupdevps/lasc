'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Furip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Furip.init({
    AttentionId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    
      //partA
      dateFiled: DataTypes.STRING,
      rg: DataTypes.STRING,
      previousFiledNumber: DataTypes.STRING,
      filedNumber: DataTypes.STRING,
      billNumber: DataTypes.STRING,
      //provider
      providerBusinessName: DataTypes.STRING,
      providerEnablementCode: DataTypes.STRING,
      providerNit: DataTypes.STRING,
      //victim
      victimLastName: DataTypes.STRING,
      victimSecondSurname: DataTypes.STRING,
      victimFirstName: DataTypes.STRING,
      victimSecondName: DataTypes.STRING,
      victimTypeId: DataTypes.STRING,
      victimNumberId: DataTypes.STRING,
      victimBirthDate: DataTypes.STRING,
      victimGender: DataTypes.STRING,
      victimAddress: DataTypes.STRING,
      victimState: DataTypes.STRING,
      victimStateCode: DataTypes.STRING,
      victimCity: DataTypes.STRING,
      victimCityCode: DataTypes.STRING,
      victimPhone: DataTypes.STRING,
      victimConditionInjured: DataTypes.STRING,
      //site of accident
      siteAccidentNatureOfEvent: DataTypes.STRING,
      siteAccidentWhichOther: DataTypes.STRING,
      siteAccidentOccurrenceAddress: DataTypes.STRING,
      siteAccidentAccidentDate: DataTypes.STRING,
      siteAccidentAccidentTime: DataTypes.STRING,
      siteAccidentState: DataTypes.STRING,
      siteAccidentStateCode: DataTypes.STRING,
      siteAccidentCity: DataTypes.STRING,
      siteAccidentCityCode: DataTypes.STRING,
      siteAccidentZone: DataTypes.STRING,
      siteAccidentAccidentDescription: DataTypes.STRING,
      //vehicle of accident
      vehicleAccidentVehicleType: DataTypes.STRING,
      vehicleAccidentBrand: DataTypes.STRING,
      vehicleAccidentPlate: DataTypes.STRING,
      vehicleAccidentServiceType: DataTypes.STRING,
      vehicleAccidentInsuranceCode: DataTypes.STRING,
      vehicleAccidentPolicyNumber: DataTypes.STRING,
      vehicleAccidentValidSince: DataTypes.STRING,
      vehicleAccidentValidUntil: DataTypes.STRING,
      vehicleAccidentAuthorityIntervention: DataTypes.STRING,
      vehicleAccidentPolicySurplusCharge: DataTypes.STRING,
      //vehicle owner
      vehicleOwnerLastName: DataTypes.STRING,
      vehicleOwnerSecondSurname: DataTypes.STRING,
      vehicleOwnerFirstName: DataTypes.STRING,
      vehicleOwnerSecondName: DataTypes.STRING,
      vehicleOwnerTypeId: DataTypes.STRING,
      vehicleOwnerNumberId: DataTypes.STRING,
      vehicleOwnerAddress: DataTypes.STRING,
      vehicleOwnerState: DataTypes.STRING,
      vehicleOwnerStateCode: DataTypes.STRING,
      vehicleOwnerCity: DataTypes.STRING,
      vehicleOwnerCityCode: DataTypes.STRING,
      vehicleOwnerPhone: DataTypes.STRING,
      
      partATotalFolio: DataTypes.STRING,

      //PartB
       // Driver Vehicle
      driverVehicleLastName: DataTypes.STRING,
      driverVehicleSecondSurname: DataTypes.STRING,
      driverVehicleFirstName: DataTypes.STRING,
      driverVehicleSecondName: DataTypes.STRING,
      driverVehicleTypeId: DataTypes.STRING,
      driverVehicleNumberId: DataTypes.STRING,
      driverVehicleAddress: DataTypes.STRING,
      driverVehicleState: DataTypes.STRING,
      driverVehicleStateCode: DataTypes.STRING,
      driverVehicleCity: DataTypes.STRING,
      driverVehicleCityCode: DataTypes.STRING,
      driverVehiclePhone: DataTypes.STRING,

      // Remision
      referralType: DataTypes.STRING,
      referralDate: DataTypes.STRING,
      referralTime: DataTypes.STRING,
      referralProviderName: DataTypes.STRING,
      referralProviderInscriptionCode: DataTypes.STRING,
      referralProviderProfessional: DataTypes.STRING,
      referralProviderProfessionalPosition: DataTypes.STRING,
      acceptanceDate: DataTypes.STRING,
      acceptanceTime: DataTypes.STRING,
      acceptanceProviderName: DataTypes.STRING,
      acceptanceProviderInscriptionCode: DataTypes.STRING,
      acceptanceProviderProfessional: DataTypes.STRING,
      acceptanceProviderProfessionalPosition: DataTypes.STRING,

      // Protection Mobilization Victim
      protectionMobilizationVictimPlate: DataTypes.STRING,
      protectionMobilizationVictimTransportVictimFrom: DataTypes.STRING,
      protectionMobilizationVictimTransportVictimSince: DataTypes.STRING,
      protectionMobilizationVictimTransportationType: DataTypes.STRING,
      protectionMobilizationVictimPlace: DataTypes.STRING,

      // Certificate Medical Care Victim
      certificateMedicalCareVictimEntryDate: DataTypes.STRING,
      certificateMedicalCareVictimEntryTime: DataTypes.STRING,
      certificateMedicalCareVictimDiagnosesPrincipalCIE10: DataTypes.STRING,
      certificateMedicalCareVictimDiagnosesRelated1CIE10: DataTypes.STRING,
      certificateMedicalCareVictimDiagnosesRelated2CIE10: DataTypes.STRING,
      certificateMedicalCareVictimEgressDate: DataTypes.STRING,
      certificateMedicalCareVictimEgressTime: DataTypes.STRING,
      certificateMedicalCareVictimEgressDiagnosesPrincipalCIE10: DataTypes.STRING,
      certificateMedicalCareVictimEgressDiagnosesRelated1CIE10: DataTypes.STRING,
      certificateMedicalCareVictimEgressDiagnosesRelated2CIE10: DataTypes.STRING,
      certificateMedicalCareVictimTreatingProfessionalLastName: DataTypes.STRING,
      certificateMedicalCareVictimTreatingProfessionalSecondSurname: DataTypes.STRING,
      certificateMedicalCareVictimTreatingProfessionalFirstName: DataTypes.STRING,
      certificateMedicalCareVictimTreatingProfessionalSecondName: DataTypes.STRING,
      certificateMedicalCareVictimTreatingProfessionalTypeId: DataTypes.STRING,
      certificateMedicalCareVictimTreatingProfessionalNumberId: DataTypes.STRING,
      certificateMedicalCareVictimTreatingProfessionalMedRecord: DataTypes.STRING,
      certificateMedicalCareVictimSurgicalMedicalExpensesBilled: DataTypes.STRING,
      certificateMedicalCareVictimSurgicalMedicalExpensesFosyga: DataTypes.STRING,
      certificateMedicalCareVictimMobilizationExpensesBilled: DataTypes.STRING,
      certificateMedicalCareVictimMobilizationExpensesFosyga: DataTypes.STRING,

      // Provider Health
      providerHealthName: DataTypes.STRING,
      providerHealthSignature: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Furip',
  });
  return Furip;
};