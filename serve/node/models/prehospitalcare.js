'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PrehospitalCare extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PrehospitalCare.init({
    AttentionId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    code: DataTypes.STRING,
    version: DataTypes.STRING,
    approvalDate: DataTypes.STRING,
    page: DataTypes.STRING,
    number: DataTypes.STRING,
    plates: DataTypes.STRING,
    centerName: DataTypes.STRING,
    mobile: DataTypes.STRING,
    attentionDate: DataTypes.STRING,
    patientFullName: DataTypes.STRING,
    patientTypeId: DataTypes.STRING,
    patientNumberId: DataTypes.STRING,
    patientAge: DataTypes.STRING,
    patientBirthDate: DataTypes.STRING,
    patientGender: DataTypes.STRING,
    patientMaritalStatus: DataTypes.STRING,
    patientServiceProvider: DataTypes.STRING,
    patientAddress: DataTypes.STRING,
    patientDistrict: DataTypes.STRING,
    patientCellphone: DataTypes.STRING,
    patientCompanion: DataTypes.STRING,
    patientCompanionRelationship: DataTypes.STRING,
    patientCompanionCellphone: DataTypes.STRING,
    transferTypeBasic: DataTypes.STRING,
    transferTypeMedicalized: DataTypes.STRING,
    accidentDateTime: DataTypes.STRING,
    originDisplacement: DataTypes.STRING,
    originArrivalTime: DataTypes.STRING,
    destinationDisplacement: DataTypes.STRING,
    destinationArrivalTime: DataTypes.STRING,
    serviceTypeDouble: DataTypes.STRING,
    serviceTypeSimple: DataTypes.STRING,
    transferReason: DataTypes.STRING,
    patientStatus: DataTypes.STRING,
    vitalSignsFc: DataTypes.STRING,
    vitalSignsFr: DataTypes.STRING,
    vitalSignsTa: DataTypes.STRING,
    vitalSignsSoz: DataTypes.STRING,
    vitalSignsGlasglow: DataTypes.STRING,
    supportsOxygen: DataTypes.STRING,
    supportsLev: DataTypes.STRING,
    supportsPeep: DataTypes.STRING,
    supportsFr: DataTypes.STRING,
    supportsFioz: DataTypes.STRING,
    background: DataTypes.STRING,
    traumaLocation: DataTypes.STRING,
    transferEndPatientStatus: DataTypes.STRING,
    signatureCenter: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PrehospitalCare',
  });
  return PrehospitalCare;
};