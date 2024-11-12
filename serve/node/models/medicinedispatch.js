'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MedicineDispatch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MedicineDispatch.init({
    numberAttention: DataTypes.BIGINT,
    numberId: DataTypes.INTEGER,
    nit: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    establishment: DataTypes.STRING,
    paymentCondition: DataTypes.STRING,
    seller: DataTypes.STRING,
    city: DataTypes.STRING,
    purchaseOrder: DataTypes.STRING,
    invoiceDate: DataTypes.DATE,
    expiration: DataTypes.DATE,
    referralNumber: DataTypes.STRING,
    total: DataTypes.FLOAT,
    

    //actualDispatch
    OrdenId: DataTypes.INTEGER, //numero de orden de autorizacion de despacho
    InvoiceId: DataTypes.INTEGER, // numero de factura asociada a este despacho
    userId: DataTypes.INTEGER, //usuario que genero el despacho
    date:  DataTypes.DATE, //fecha despacho
    state:  DataTypes.STRING, //estado del despacho
    cant:  DataTypes.INTEGER, // cantidad depachada
    productId:  DataTypes.INTEGER, // codigo de producto despachado

  }, {
    sequelize,
    modelName: 'MedicineDispatch',
  });
  return MedicineDispatch;
};