'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Anex9 extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Anex9.init({
    AttentionId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    date: DataTypes.STRING,
    time: DataTypes.STRING,
    providerName: DataTypes.STRING,
    providerTypeId: DataTypes.STRING,
    providerNumberId: DataTypes.STRING,
    providerCode: DataTypes.STRING,
    providerAddress: DataTypes.STRING,
    providerPhoneCode: DataTypes.STRING,
    providerPhoneNumber: DataTypes.STRING,
    providerState: DataTypes.STRING,
    providerCity: DataTypes.STRING,
    patientFullName: DataTypes.STRING,
    patientTypeId: DataTypes.STRING,
    patientNumberId: DataTypes.STRING,
    patientBirthDate: DataTypes.STRING,
    patientAddress: DataTypes.STRING,
    patientPhone: DataTypes.STRING,
    patientState: DataTypes.STRING,
    patientCity: DataTypes.STRING,
    patientServiceProviderName: DataTypes.STRING,
    patientServiceProviderCode: DataTypes.STRING,
    tutorFullName: DataTypes.STRING,
    tutorTypeId: DataTypes.STRING,
    tutorNumberId: DataTypes.STRING,
    tutorBirthDate: DataTypes.STRING,
    tutorAddress: DataTypes.STRING,
    tutorPhone: DataTypes.STRING,
    tutorState: DataTypes.STRING,
    tutorCity: DataTypes.STRING,
    personRequestingFullName: DataTypes.STRING,
    personRequestingPhoneCode: DataTypes.STRING,
    personRequestingPhoneNumber: DataTypes.STRING,
    personRequestingPhoneExtension: DataTypes.STRING,
    personRequestingCellphone: DataTypes.STRING,
    ServiceRequesting: DataTypes.STRING,
    ServiceReferenceRequested: DataTypes.STRING,
    relevantClinicalInformation: DataTypes.TEXT,
    professionalSignature: DataTypes.STRING,
    professionalRegistrationNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Anex9',
  });
  return Anex9;
};