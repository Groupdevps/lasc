'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Furtran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Furtran.init({
    AttentionId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    deadline: DataTypes.STRING,
    rg: DataTypes.STRING,
    previousFilingNumber: DataTypes.STRING,
    filingNumber: DataTypes.STRING,
    transporterName: DataTypes.STRING,
    transporterEnableCode: DataTypes.STRING,
    transporterLastName: DataTypes.STRING,
    transporterSecondSurname: DataTypes.STRING,
    transporterFirstName: DataTypes.STRING,
    transporterSecondName: DataTypes.STRING,
    transporterTypeId: DataTypes.STRING,
    transporterNumberId: DataTypes.STRING,
    transporterServiceType: DataTypes.STRING,
    transporterPersonServiceType: DataTypes.STRING,
    transporterPersonWhich : DataTypes.STRING,
    transporterPlate: DataTypes.STRING,
    transporterAddress: DataTypes.STRING,
    transporterPhone: DataTypes.STRING,
    transporterStateName: DataTypes.STRING,
    transporterStateCode: DataTypes.STRING,
    transporterCityName: DataTypes.STRING,
    transporterCityCode: DataTypes.STRING,
    transferredVictimsTypeId: DataTypes.STRING,
    transferredVictimsNumberId: DataTypes.STRING,
    transferredVictimsFirstName: DataTypes.STRING,
    transferredVictimsSecondName: DataTypes.STRING,
    transferredVictimsLastName: DataTypes.STRING,
    transferredVictimsSecondSurname: DataTypes.STRING,
    transferredVictimsEventType: DataTypes.STRING,
    transferredVictimsEventOthers: DataTypes.STRING,
    pickUpPlaceAddress: DataTypes.STRING,
    pickUpPlaceStateName: DataTypes.STRING,
    pickUpPlaceStateCode: DataTypes.STRING,
    pickUpPlaceCityName: DataTypes.STRING,
    pickUpPlaceCityCode: DataTypes.STRING,
    pickUpPlaceZone: DataTypes.STRING,
    certificationDate: DataTypes.STRING,
    certificationTime: DataTypes.STRING,
    certificationCenterName: DataTypes.STRING,
    certificationCenterNit: DataTypes.STRING,
    certificationCenterCode: DataTypes.STRING,
    certificationCenterAddress: DataTypes.STRING,
    certificationCenterStateName: DataTypes.STRING,
    certificationCenterStateCode: DataTypes.STRING,
    certificationCenterCityName: DataTypes.STRING,
    certificationCenterCityCode: DataTypes.STRING,
    certificationCenterPhone: DataTypes.STRING,
    certificationCenterManagerName: DataTypes.STRING,
    certificationCenterManagerSignature: DataTypes.STRING,
    certificationCenterManagerTypeId: DataTypes.STRING,
    certificationCenterManagerNumberId: DataTypes.STRING,
    certificationTransporterSignature: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Furtran',
  });
  return Furtran;
};