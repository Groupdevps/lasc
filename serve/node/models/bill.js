'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bill.hasMany(models.Detail, { foreignKey: 'BillId' });
      Bill.belongsTo(models.Center, {foreignKey: 'CenterId'});

      Bill.belongsTo(models.ElectronicBillingAuthorization, { foreignKey: 'ElectronicBillingAuthorizationId' });

    }
  }
  Bill.init({

    //paciente
    patientFullName: DataTypes.STRING,
    patientNumberId: DataTypes.STRING,
    patientTypeId: DataTypes.STRING,
    patientAddress: DataTypes.STRING,
    patientPhone: DataTypes.STRING,
    patientBirthDay: DataTypes.STRING,
    patientAge: DataTypes.STRING,

    //Factura
    billNumber: DataTypes.STRING,
    billExpeditionDate: DataTypes.DATE,
    billDueDate: DataTypes.DATE,


    //atencion
    UserId: DataTypes.INTEGER,
    AttentionId: DataTypes.INTEGER,
    entryDate: DataTypes.DATE, //fecha de atencion y hora
    exitDate: DataTypes.DATE, // PENDIENTE POR MIGRACION
    serviceType: DataTypes.STRING,

    //aseguradora
    
    payerName: DataTypes.STRING,
    payerNit: DataTypes.STRING,
    payerAddress: DataTypes.STRING,
    payerPhone: DataTypes.STRING,
    payerCity: DataTypes.STRING,
    patientAddress: DataTypes.STRING,
    
    
    billSubtotal: DataTypes.INTEGER, 
    billSubtotalLetters: DataTypes.STRING,
    
    //radicacion
    filingDate: DataTypes.DATEONLY, 
    filingHour: DataTypes.TIME,
    filing: DataTypes.STRING,

    //firma digital
    DigitalSignatureId: DataTypes.INTEGER,
    numberAgreement: DataTypes.STRING,
    CenterId: DataTypes.INTEGER,
    ElectronicBillingAuthorizationId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ElectronicBillingAuthorizations',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'  // Esto significa que si se borra la autorización, el campo quedará en null
    },

    // PENDIENTE POR MIGRACION de aqui para abajo
    note : DataTypes.TEXT,
    InvoiceTypeCode : DataTypes.STRING, // PENDIENTE POR MIGRACION//deacuerdo a el anexo tecnico si es factura electronica, nota debito o credito 
     //EMISOR
    organizationType: DataTypes.STRING // 1 para persona juridica, 2 para persona natural
    
  }, {
    sequelize,
    modelName: 'Bill',
  });
  return Bill;
};