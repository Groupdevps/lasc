'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ServiceFee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ServiceFee.belongsTo(models.TypeFee, {
        foreignKey: 'typeFee'
      })
      ServiceFee.belongsTo(models.Regime, {
        foreignKey: 'regime'
      })
    }
  }
  ServiceFee.init({
    name: DataTypes.STRING,
    typeFee: DataTypes.INTEGER,
    regime: DataTypes.INTEGER,
    value: DataTypes.INTEGER,
    salaryMin: DataTypes.INTEGER,
    salaryMax: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ServiceFee',
  });
  return ServiceFee;
};