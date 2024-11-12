'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.HistoryPerson.hasOne(Invoice );
      Invoice.belongsTo(models.HistoryPerson);
    
    }
  }
  Invoice.init({
    //date
    dateAdmission: DataTypes.DATEONLY,
    dateService: DataTypes.DATEONLY,
    departureDate: DataTypes.DATEONLY,
    hour: DataTypes.TIME,
    //info person
    HistoryPersonId: DataTypes.INTEGER,
    numberId: DataTypes.BIGINT,
    //info center
    
    assignedCenter: DataTypes.STRING,
    nit: DataTypes.STRING,
    //info service
    AttentionId: DataTypes.INTEGER,
    triage: DataTypes.STRING,
    diagnosis: DataTypes.TEXT,
    authorizationNumber: DataTypes.STRING,

    //info invoice
    StatusId: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    tax: DataTypes.INTEGER,
    invoiceNumber: DataTypes.INTEGER,
    subTotalInvoiceInformation: DataTypes.FLOAT,
    subTotalAddedMedication: DataTypes.FLOAT,
    SubTotalTariffManuals: DataTypes.FLOAT,
    subTotal: DataTypes.FLOAT,
    totalString: DataTypes.STRING,
    total: DataTypes.FLOAT,
    
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Invoice',
  });
  return Invoice;
};