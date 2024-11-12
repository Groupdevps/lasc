'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HospitalExpense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HospitalExpense.init({
    numberAttention: DataTypes.BIGINT, //numero de atencion //trae la fecha
    dateAdmission: DataTypes.DATE, //fecha ingreso hospitalizacion
    
    hospitalization: DataTypes.STRING,//
    accountCut: DataTypes.STRING,
    egressDate: DataTypes.DATE,
    idxIncome: DataTypes.STRING,//dx ingreso
    idxEgress: DataTypes.STRING,
    relatedIdx: DataTypes.STRING,
    idxDate: DataTypes.DATE,
    diagnosis: DataTypes.TEXT, // lista de diagnosstico
    observations: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'HospitalExpense',
  });
  return HospitalExpense;
};