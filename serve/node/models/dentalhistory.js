'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DentalHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DentalHistory.init({
    numberAttention: DataTypes.BIGINT,
    processName: DataTypes.STRING,
    value: DataTypes.STRING,
    value1: DataTypes.TEXT,
    value2: DataTypes.STRING,
    value3: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DentalHistory',
  });
  return DentalHistory;
};