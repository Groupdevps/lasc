'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Discharge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Discharge.belongsTo(models.Attention, {
        foreignKey: 'AttentionId'
      });

      // Asociación con el modelo Person
      Discharge.belongsTo(models.Person, {
        foreignKey: 'PersonId',
        as: 'person'
      });

      // Asociación con el modelo User (doctor)
      Discharge.belongsTo(models.User, {
        foreignKey: 'UserId'
      });

      // Asociación con el modelo DiagnosticList (mainDischargeDiagnosis)
      Discharge.belongsTo(models.DiagnosticList, {
        foreignKey: 'mainDischargeDiagnosis',
        as: 'mainDischargeDiagnosisDetail'
      });

      // Asociación con el modelo DiagnosticList (diagnosis1Discharge)
      Discharge.belongsTo(models.DiagnosticList, {
        foreignKey: 'diagnosis1Discharge',
        as: 'diagnosis1DischargeDetail'
      });

      // Asociación con el modelo DiagnosticList (diagnosis2Discharge)
      Discharge.belongsTo(models.DiagnosticList, {
        foreignKey: 'diagnosis2Discharge',
        as: 'diagnosis2DischargeDetail'
      });

      // Asociación con el modelo DiagnosticList (diagnosis3Discharge)
      Discharge.belongsTo(models.DiagnosticList, {
        foreignKey: 'diagnosis3Discharge',
        as: 'diagnosis3DischargeDetail'
      });
    
    }
  }
  Discharge.init({
    weight: DataTypes.INTEGER,
    size: DataTypes.INTEGER,
    arterialTsn: DataTypes.STRING,
    cardiacFr: DataTypes.INTEGER,
    respiratoryFr: DataTypes.INTEGER,
    pulse: DataTypes.INTEGER,
    temperature: DataTypes.FLOAT,
    eyeOpening: DataTypes.INTEGER,
    verbalResponse: DataTypes.INTEGER,
    motorResponse: DataTypes.INTEGER,
    generalConditionsUponDeparture: DataTypes.TEXT,
    headAndNeck: DataTypes.TEXT,
    chest: DataTypes.TEXT,
    abdomen: DataTypes.TEXT,
    extremities: DataTypes.TEXT,
    neurological: DataTypes.TEXT,
    genitourinary: DataTypes.TEXT,
    evolutions: DataTypes.TEXT,
    hospitalizationJustification: DataTypes.TEXT,
    orders: DataTypes.TEXT,
    mainDischargeDiagnosis: DataTypes.INTEGER,
    diagnosis1Discharge: DataTypes.INTEGER,
    diagnosis2Discharge: DataTypes.INTEGER,
    diagnosis3Discharge: DataTypes.INTEGER,
    consultationSPurpose: DataTypes.STRING,
    externalCause: {
      type: DataTypes.ENUM(
        'ENFERMEDAD GENERAL',
        'ENFERMEDAD PROFESIONAL',
        'ACCIDENTE DE TRABAJO',
        'ACCIDENTE DE TRANSITO',
        'ACCIDENTE RABICO',
        'ACCIDENTE OFIDICO',
        'MALTRATO FISICO',
        'SOSPECHA ABUSO SEXUAL',
        'SOSPECHA VIOLENCIA SEXUAL',
        'LESION POR AGRESION',
        'LESION AUTO-INFLINGIDA'
      ),
      allowNull: true
    },
    departureReason: {
      type: DataTypes.ENUM(
        'REMISIÓN',
        'RETIRO VOLUNTARIO',
        'MEJORÍA DEL CUADRO',
        'VIVO',
        'MUERTO',
      ),
      allowNull: true
    },
    exitStatus: {
      type: DataTypes.ENUM(
        'VIVO',
        'MUERTO',
      ),
      allowNull: true
    },
    AttentionId: DataTypes.INTEGER,
    PersonId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    skinFannels: DataTypes.TEXT, // PIEL/FANERAS
    lumbarOsteotendinous: DataTypes.TEXT // LUMBAR/OSTEOTENDIOSO
  }, {
    sequelize,
    modelName: 'Discharge',
  });
  return Discharge;
};