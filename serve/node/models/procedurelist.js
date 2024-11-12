'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProcedureList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProcedureList.init({
    cups: DataTypes.INTEGER,
    description: DataTypes.STRING,
    level: DataTypes.INTEGER,
    clarification: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'ProcedureList',
  });
  return ProcedureList;
};