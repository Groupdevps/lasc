'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AnalysisLaboratory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Analysis.hasMany(AnalysisLaboratory);
      AnalysisLaboratory.belongsTo(models.Analysis);
      
      models.CupsList.hasMany(AnalysisLaboratory);
      AnalysisLaboratory.belongsTo(models.CupsList);
    }
  }
  AnalysisLaboratory.init({
    AnalysisId: DataTypes.INTEGER,
    cup: DataTypes.STRING,
    CupsListId: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'AnalysisLaboratory',
  });
  return AnalysisLaboratory;
};