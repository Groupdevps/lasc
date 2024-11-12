'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubTreatment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
      static associate(models) {
      // define association here
      //MANYTOMANY MEDICAL FORMULA
      models.MedicalFormula.hasMany(SubTreatment);
      SubTreatment.belongsTo(models.MedicalFormula);

       models.MedicalFormula.hasMany(SubTreatment);
       SubTreatment.belongsTo(models.MedicalFormula);

       //MANYTOMANY MEDICAL FORMULA
      models.TreatmentList.hasMany(SubTreatment);
      SubTreatment.belongsTo(models.TreatmentList);

      models.TreatmentList.hasMany(SubTreatment);
      SubTreatment.belongsTo(models.TreatmentList);

      //one to many order lab
      models.OrderLab.hasMany(SubTreatment);
      SubTreatment.belongsTo(models.OrderLab);
      //one to many DiagnosticAid
      models.DiagnosticAid.hasMany(SubTreatment);
      SubTreatment.belongsTo(models.DiagnosticAid);
      //one to many CupsList
      models.CupsList.hasMany(SubTreatment);
      SubTreatment.belongsTo(models.CupsList);

    }
  }
  SubTreatment.init({
    //relations
    MedicalFormulaId: DataTypes.INTEGER,
    AttentionId: DataTypes.INTEGER,
    TreatmentListId: DataTypes.INTEGER,
    CupsListId: DataTypes.INTEGER,

    OrderLabId: DataTypes.INTEGER,
    DiagnosticAidId: DataTypes.INTEGER,
    //Info
    date: DataTypes.DATEONLY,
    treatment: DataTypes.TEXT //treatment Personalized

  }, {
    sequelize,
    modelName: 'SubTreatment',
  });
  return SubTreatment;
};