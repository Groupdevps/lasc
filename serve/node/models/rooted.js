'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rooted extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Rooted.init({
    specialtyCode: DataTypes.INTEGER,
    typeId: DataTypes.STRING,
    numberId: DataTypes.INTEGER,
    remissionDate: DataTypes.DATE,
    referralTime: DataTypes.STRING,
    codeEnabledESE: DataTypes.INTEGER,
    reasonRefers: DataTypes.STRING,
    observation: DataTypes.TEXT,
    serviceCode: DataTypes.STRING,
    eps: DataTypes.STRING,
    nit: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Rooted',
  });
  return Rooted;
};