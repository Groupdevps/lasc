'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ConfigurableMedication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ConfigurableMedication.init({
    description: DataTypes.STRING,
    vat: DataTypes.STRING,
    purchaseValue: DataTypes.STRING,
    purchaseValue2: DataTypes.STRING,
    units: DataTypes.STRING,
    saleByEps: DataTypes.STRING,
    hourValue: DataTypes.STRING,
    halfHourValue: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ConfigurableMedication',
  });
  return ConfigurableMedication;
};