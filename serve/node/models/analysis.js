'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Analysis extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.AnalysisType.hasMany(Analysis)
      Analysis.belongsTo(models.AnalysisType)
    }
  }
  Analysis.init({
    name: DataTypes.STRING,
    units: DataTypes.STRING,
    referenceValue: DataTypes.STRING,
    AnalysisTypeId: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Analysis',
  });
  return Analysis;
};