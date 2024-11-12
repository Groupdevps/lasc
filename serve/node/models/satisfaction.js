'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Satisfaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Satisfaction.init({
    AttentionId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    //datos autocompletar
    patientFullName: DataTypes.STRING,
    admissionNumber: DataTypes.STRING,
    epr: DataTypes.STRING,
    admissionDate: DataTypes.STRING,
    departureDate: DataTypes.STRING,
    //firma de paciente manual (no requerido)
    signature: DataTypes.STRING,
    fingerprint: DataTypes.STRING,
    numberId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Satisfaction',
  });
  return Satisfaction;
};