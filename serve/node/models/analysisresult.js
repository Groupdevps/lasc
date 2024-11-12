'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AnalysisResult extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.AnalysisLaboratory.hasMany(AnalysisResult)
      AnalysisResult.belongsTo(models.AnalysisLaboratory)

      models.LaboratoryResult.hasMany(AnalysisResult)
      AnalysisResult.belongsTo(models.LaboratoryResult)
      
    }
  }
  AnalysisResult.init({
    AnalysisLaboratoryId: DataTypes.INTEGER,
    LaboratoryResultId: DataTypes.INTEGER,
    result: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'AnalysisResult',
  });
  return AnalysisResult;
};