'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Regime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Regime.hasMany(models.ServiceProvider, {
        foreignKey: 'regime'
      })
      Regime.hasMany(models.ServiceFee, {
        foreignKey: 'regime'
      })
      Regime.hasMany(models.CurrentAdministrator)
    }
  }
  Regime.init({
    name: DataTypes.STRING,
    center : DataTypes.BOOLEAN,
    person : DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Regime',
  });
  return Regime;
};