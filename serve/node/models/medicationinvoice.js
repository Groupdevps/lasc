'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MedicationInvoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MedicationInvoice.init({
    numberAttention: DataTypes.BIGINT,
    medicine: DataTypes.STRING,
    code: DataTypes.STRING,
    price: DataTypes.FLOAT,
    amount: DataTypes.INTEGER,
    total: DataTypes.FLOAT,
    service: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MedicationInvoice',
  });
  return MedicationInvoice;
};