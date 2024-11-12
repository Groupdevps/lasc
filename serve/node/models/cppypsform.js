'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CppypsForm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CppypsForm.init({
    roll: DataTypes.STRING,
    numberAttention: DataTypes.BIGINT,
    entryNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CppypsForm',
  });
  return CppypsForm;
};