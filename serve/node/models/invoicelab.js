'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InvoiceLab extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  InvoiceLab.init({
    numberAttention: DataTypes.BIGINT,
    diagnosis: DataTypes.TEXT,
    date: DataTypes.DATE,
    processName: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'InvoiceLab',
  });
  return InvoiceLab;
};