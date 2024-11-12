'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EpicrisisMedicine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EpicrisisMedicine.init({
    numberAttention: DataTypes.BIGINT,
    medicine: DataTypes.TEXT,
    dose: DataTypes.STRING,
    since: DataTypes.DATE,
    until: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'EpicrisisMedicine',
  });
  return EpicrisisMedicine;
};