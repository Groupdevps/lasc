'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Epicrisi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Attention.hasOne(Epicrisi);
      Epicrisi.belongsTo(models.Attention);



    }
  }
  Epicrisi.init({
    
    //Datos del Centro Médico: Nombre del centro médico.Dirección.Información de contacto. []

    //Datos del Paciente: Nombre completo del paciente.Número de identificación.Edad.Género.
    HistoryPersonId: DataTypes.INTEGER,
    admissionDate: DataTypes.DATE,
    egressDate: DataTypes.DATE,
    duration: DataTypes.STRING,
    //Datos de la Atención: Tipo de Servicio. Fecha de ingreso y fecha de egreso.
    AttentionId: DataTypes.INTEGER,
    //Diagnosticos : Ingreso, Salida, Egreso[]
    //Datos del Tratamiento: Motivo.observacion, Antecedentes,Examen Fisico, plan(primera nota evolucion)fecha y hora
    EmergencyMedicalHistoryId: DataTypes.INTEGER,
    //Notas medicas:medico, especialidad, fecha, hora, nota medica[]
    //AyudaAmbulatoria[]
    //AyudaDiagnostica[]  y laboratorios[] cant description observaciones
    //medicamento[]cantidad descripcion 
    motive: DataTypes.TEXT,
    justification: DataTypes.TEXT,
    plan: DataTypes.TEXT,
    MedicineId: DataTypes.INTEGER,
    //Doctor, nombre, especialidad codigo, registro, firma digital
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Epicrisi',
  });
  return Epicrisi;
};