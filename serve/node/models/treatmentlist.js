'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TreatmentList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TreatmentList.init({
    cups: DataTypes.STRING,
    description: DataTypes.TEXT,
    level: DataTypes.INTEGER,
    clarification: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'TreatmentList',
  });
  return TreatmentList;
};