'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ServiceAuthorization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ServiceAuthorization.init({
    numberAttention: DataTypes.BIGINT,
    serviceNumber: DataTypes.STRING,
    expeditionDate: DataTypes.DATE,
    code: DataTypes.STRING,
    modality: DataTypes.STRING,
    startDate: DataTypes.DATE,
    departureDate: DataTypes.DATE,
    level: DataTypes.INTEGER,
    service: DataTypes.STRING,
    specialty: DataTypes.STRING,
    ambit: DataTypes.STRING,
    valid: DataTypes.STRING,
    originRequest: DataTypes.STRING,
    observation: DataTypes.TEXT,
    number: DataTypes.STRING,
    medicalDate: DataTypes.STRING,
    ips: DataTypes.STRING,
    person: DataTypes.STRING,
    phone: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ServiceAuthorization',
  });
  return ServiceAuthorization;
};