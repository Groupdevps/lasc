'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Anex3 extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Anex3.init({
    UserId: DataTypes.INTEGER,
    AttentionId: DataTypes.INTEGER,
    requestNumber: DataTypes.STRING,
    //fecha y hora
    anexoDate: DataTypes.STRING,
    anexoTime: DataTypes.STRING,
    //proveedor 
    providerName: DataTypes.STRING, //nombre
    providerCode: DataTypes.STRING, //codigo
    providerTypeId: DataTypes.STRING, //typeId
    providerNumberId: DataTypes.STRING, //numero
    providerAddress: DataTypes.STRING,//direccion
    providerState: DataTypes.STRING,//departamento
    providerCity: DataTypes.STRING,//municipio
    providerPhoneCode: DataTypes.STRING,// telefono indicativo
    providerPhoneNumber: DataTypes.STRING,// telefono numero
    //pagador
    payerName: DataTypes.STRING,// nombre
    payerCode: DataTypes.STRING,//codigo
    //paciente 
    patientFirstName: DataTypes.STRING,//primer nombre
    patientSecondName: DataTypes.STRING,//segundo nombre
    patientLastName: DataTypes.STRING,//primer apellido
    patientSecondSurname: DataTypes.STRING,//segundo apellido
    patientTypeId: DataTypes.STRING,//typeId
    patientNumberId: DataTypes.STRING,//numero de identificacion
    patientBirthDate: DataTypes.STRING,//fecha de nacimiento
    patientAddress: DataTypes.STRING,//direccion
    patientState: DataTypes.STRING,//departamento
    patientCity: DataTypes.STRING,//municipio
    patientPhone: DataTypes.STRING,//telefono
    patientCellphone: DataTypes.STRING,//celular
    patientEmail: DataTypes.STRING, //correo
    patientRegime: DataTypes.STRING,//regimen
    //atencion---

    attentionOrigin: DataTypes.STRING,//origen de la atencion
    typeAttention: DataTypes.STRING,//tipo de servicio solicitado
    attentionPriority: DataTypes.STRING, //prioridad de la atencion
    locationPatient: DataTypes.STRING,// ubicacion del paciente al momento de la autorizacion de servicio
    locationService: DataTypes.STRING,// tipo de servicio 
    locationBed: DataTypes.STRING,// cama
    guide: DataTypes.STRING,//manejo de guia
    justification: DataTypes.TEXT,//justificacion clinica
    //diagnosticos
    diagnosesCIE10Principal: DataTypes.STRING, //codigo
    diagnosesCIE10Related1: DataTypes.STRING,
    diagnosesCIE10Related2: DataTypes.STRING,
    diagnosesDescriptionPrincipal: DataTypes.STRING,//descripcion
    diagnosesDescriptionRelated1: DataTypes.STRING,
    diagnosesDescriptionRelated2: DataTypes.STRING,
    //informante
    informantName: DataTypes.STRING, //nombre
    informantPosition: DataTypes.STRING, //cargo
    //telefono
    informantPhoneCode: DataTypes.STRING, // indicativo 
    informantPhoneNumber: DataTypes.STRING, //numero
    informantPhoneExtension: DataTypes.STRING, //extension
    informantCellphone: DataTypes.STRING //celular
  }, {
    sequelize,
    modelName: 'Anex3',
  });
  return Anex3;
};