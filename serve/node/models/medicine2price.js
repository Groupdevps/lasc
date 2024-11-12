'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Medicine2Price extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Medicine2Price.init({
    marketId: DataTypes.STRING,
    atcInvites: DataTypes.STRING,
    activePrinciple: DataTypes.STRING,
    pharmaceuticalForm: DataTypes.STRING,
    unitValue: DataTypes.FLOAT,
    unit: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Medicine2Price',
  });
  return Medicine2Price;
};