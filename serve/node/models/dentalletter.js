'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DentalLetter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DentalLetter.init({
    numberAttention: DataTypes.BIGINT,
    toothNumber: DataTypes.STRING,
    tooth: DataTypes.STRING,
    dentalSide: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DentalLetter',
  });
  return DentalLetter;
};