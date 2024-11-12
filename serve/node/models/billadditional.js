'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BillAdditional extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BillAdditional.init({
    numberAttention: DataTypes.BIGINT,
    diagnosis: DataTypes.TEXT,
    date: DataTypes.DATE,
    processName: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BillAdditional',
  });
  return BillAdditional;
};