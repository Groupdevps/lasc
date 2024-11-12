'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DentalMedicalHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DentalMedicalHistory.init({
    numberId: DataTypes.INTEGER,
    numberAttention: DataTypes.BIGINT,
    diagnosis: DataTypes.TEXT,
    date: DataTypes.STRING,
    authorizationNumber: DataTypes.STRING,
    socialSecurity: DataTypes.STRING,
    dateAdmission: DataTypes.STRING,
    time: DataTypes.STRING,
    motive: DataTypes.TEXT,
    observation: DataTypes.TEXT,
    dentalHistory: DataTypes.TEXT,
    medicalTreatment: DataTypes.TEXT,
    pa: DataTypes.STRING,
    fc: DataTypes.STRING,
    fr: DataTypes.STRING,
    temperature: DataTypes.STRING,
    weight: DataTypes.STRING,
    sp_t: DataTypes.STRING,
    sdp: DataTypes.STRING,
    result: DataTypes.STRING,
    result1: DataTypes.STRING,
    observation1: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DentalMedicalHistory',
  });
  return DentalMedicalHistory;
};