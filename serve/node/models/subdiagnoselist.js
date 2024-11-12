'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubDiagnoseList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Setup a One-to-Many relationship between User and Grant
      //MANYTOMANY DIAGNOSE
      models.SubDiagnose.hasMany(SubDiagnoseList);
      SubDiagnoseList.belongsTo(models.SubDiagnose);

      models.ClinicHistory.hasMany(SubDiagnoseList);
      SubDiagnoseList.belongsTo(models.ClinicHistory);
`
`     //one to many MEDICALORDER
      models.MedicalOrder.hasMany(SubDiagnoseList);
      SubDiagnoseList.belongsTo(models.MedicalOrder);

      //one to many EMERGENCY MEDICAL HISTORY
      models.EmergencyMedicalHistory.hasMany(SubDiagnoseList);
      SubDiagnoseList.belongsTo(models.EmergencyMedicalHistory);

      //one to many MedicalFormula
       models.MedicalFormula.hasMany(SubDiagnoseList);
      SubDiagnoseList.belongsTo(models.MedicalFormula);

      //one tomany OutpatientOrder
       models.OutpatientOrder.hasMany(SubDiagnoseList);
      SubDiagnoseList.belongsTo(models.OutpatientOrder);

      //Mone to many
      models.OrderLab.hasMany(SubDiagnoseList);
      SubDiagnoseList.belongsTo(models.OrderLab);

      //one to many DiagnosticAid
      models.DiagnosticAid.hasMany(SubDiagnoseList);
      SubDiagnoseList.belongsTo(models.DiagnosticAid);

      //one to many EvolutionNote
      models.EvolutionNote.hasMany(SubDiagnoseList);
      SubDiagnoseList.belongsTo(models.EvolutionNote);

      //one to many Epicrisi
      models.Epicrisi.hasMany(SubDiagnoseList);
      SubDiagnoseList.belongsTo(models.Epicrisi);

      

    }
  }
  SubDiagnoseList.init({
    //info diagnose
    date: DataTypes.DATEONLY,
    SubDiagnoseId: DataTypes.INTEGER,
    repeated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    //relations
    ClinicHistoryId: DataTypes.INTEGER,
    AttentionId: DataTypes.INTEGER,
    MedicalOrderId: DataTypes.INTEGER,
    EmergencyMedicalHistoryId: DataTypes.INTEGER,
    MedicalFormulaId: DataTypes.INTEGER,
    OutpatientOrderId: DataTypes.INTEGER,
    OrderLabId: DataTypes.INTEGER,
    DiagnosticAidId: DataTypes.INTEGER,
    EvolutionNoteId: DataTypes.INTEGER,
    EpicrisiId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'SubDiagnoseList',
  });
  return SubDiagnoseList;
};