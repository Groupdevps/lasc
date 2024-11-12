'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MedicinePrice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MedicinePrice.init({
    marketId: DataTypes.STRING,
    cum: DataTypes.STRING,
    medicine: DataTypes.STRING,
    headline: DataTypes.STRING,
    maximumPrice: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MedicinePrice',
  });
  return MedicinePrice;
};