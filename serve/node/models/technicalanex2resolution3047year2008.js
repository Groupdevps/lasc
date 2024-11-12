'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TechnicalAnex2Resolution3047Year2008 extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TechnicalAnex2Resolution3047Year2008.init({
    UserId: DataTypes.INTEGER,
    AttentionId: DataTypes.INTEGER,
    attentionNumber: DataTypes.STRING,
    anexoDate: DataTypes.STRING,
    anexoTime: DataTypes.STRING,
    providerName: DataTypes.STRING,
    providerCode: DataTypes.STRING,
    providerTypeId: DataTypes.STRING,
    providerNumberId: DataTypes.STRING,
    providerAddress: DataTypes.STRING,
    providerState: DataTypes.STRING,
    providerCity: DataTypes.STRING,
    providerPhoneCode: DataTypes.STRING,
    providerPhoneNumber: DataTypes.STRING,
    payerName: DataTypes.STRING,
    payerCode: DataTypes.STRING,
    patientFirstName: DataTypes.STRING,
    patientSecondName: DataTypes.STRING,
    patientLastName: DataTypes.STRING,
    patientSecondSurname: DataTypes.STRING,
    patientTypeId: DataTypes.STRING,
    patientNumberId: DataTypes.STRING,
    patientBirthDate: DataTypes.STRING,
    patientAddress: DataTypes.STRING,
    patientState: DataTypes.STRING,
    patientCity: DataTypes.STRING,
    patientPhone: DataTypes.STRING,
    patientRegime: DataTypes.STRING,
    attentionOrigin: DataTypes.STRING,
    triageClassification: DataTypes.STRING,
    attentionDate: DataTypes.STRING,
    attentionTime: DataTypes.STRING,
    refferingProviderTransferred: DataTypes.STRING,
    refferingProviderName: DataTypes.STRING,
    refferingProviderCode: DataTypes.STRING,
    refferingProviderState: DataTypes.STRING,
    refferingProviderCity: DataTypes.STRING,
    attentionMotive: DataTypes.STRING,
    diagnosesCIE10Principal: DataTypes.STRING,
    diagnosesCIE10Related1: DataTypes.STRING,
    diagnosesCIE10Related2: DataTypes.STRING,
    diagnosesCIE10Related3: DataTypes.STRING,
    diagnosesDescriptionPrincipal: DataTypes.STRING,
    diagnosesDescriptionRelated1: DataTypes.STRING,
    diagnosesDescriptionRelated2: DataTypes.STRING,
    diagnosesDescriptionRelated3: DataTypes.STRING,
    patientDestination: DataTypes.STRING,
    informantName: DataTypes.STRING,
    informantPosition: DataTypes.STRING,
    informantPhoneCode: DataTypes.STRING,
    informantPhoneNumber: DataTypes.STRING,
    informantPhoneExtension: DataTypes.STRING,
    informantCellphone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TechnicalAnex2Resolution3047Year2008',
  });
  return TechnicalAnex2Resolution3047Year2008;
};