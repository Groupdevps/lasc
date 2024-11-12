'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DiagnosticList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DiagnosticList.init({
    code: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DiagnosticList',
  });
  return DiagnosticList;
};