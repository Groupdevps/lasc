'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SOAT extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SOAT.init({
    AttentionId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    injuredPersonFullname: DataTypes.STRING,
    injuredPersonAdmissionDate: DataTypes.STRING,
    injuredPersonAdmissionTime: DataTypes.STRING,
    injuredPersonNumberId: DataTypes.STRING,
    injuredPersonTypeId: DataTypes.STRING,
    injuredPersonIssued: DataTypes.STRING, //expedido en
    injuredPersonGender: DataTypes.STRING,
    injuredPersonBirthDate: DataTypes.STRING,
    injuredPersonAge: DataTypes.STRING,
    injuredPersonSocialInsurance: DataTypes.STRING,
    injuredPersonAddress: DataTypes.STRING,
    injuredPersonState: DataTypes.STRING,
    injuredPersonCity: DataTypes.STRING,
    injuredPersonDistrict: DataTypes.STRING,
    injuredPersonPhone: DataTypes.STRING,
    injuredPersonCellphone: DataTypes.STRING,
    injuredPersonProfession: DataTypes.STRING,
    injuredPersonMaritalStatus: DataTypes.STRING,
    injuredPersonCompanion: DataTypes.STRING,
    injuredPersonRelationship: DataTypes.STRING,
    responsibleInsuranceCarrier: DataTypes.STRING,
    responsibleAdmissionist: DataTypes.STRING,
    responsibleOriginSelected: DataTypes.STRING,
    responsibleOriginName: DataTypes.STRING,
    accidentInjuredCondition: DataTypes.STRING,
    accidentAddress: DataTypes.STRING,
    accidentDate: DataTypes.STRING,
    accidentTime: DataTypes.STRING,
    accidentState: DataTypes.STRING,
    accidentCity: DataTypes.STRING,
    accidentZone: DataTypes.STRING,
    accidentReport: DataTypes.TEXT,
    accidentVehicleBrand: DataTypes.STRING,
    accidentVehiclePlate: DataTypes.STRING,
    accidentVehicleType: DataTypes.STRING,
    accidentVehicleInsured: DataTypes.STRING,
    accidentDriverPatient: DataTypes.STRING,
    accidentDriverName: DataTypes.STRING,
    accidentDriverNumberId: DataTypes.STRING,
    accidentDriverTypeId: DataTypes.STRING,
    accidentDriverIssued: DataTypes.STRING,//expedido en
    accidentDriverAddress: DataTypes.STRING,
    accidentDriverCity: DataTypes.STRING,
    accidentDriverCellphone: DataTypes.STRING,
    signature: DataTypes.STRING,
    fingerprint: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SOAT',
  });
  return SOAT;
};