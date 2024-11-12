'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InvoiceInformation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Invoice.hasMany(InvoiceInformation );
      InvoiceInformation.belongsTo(models.Invoice);

    }
  }
  InvoiceInformation.init({
    medicine: DataTypes.STRING,
    code: DataTypes.STRING,
    price: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER,
    service: DataTypes.STRING,
    total: DataTypes.FLOAT,
    InvoiceId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'InvoiceInformation',
  });
  return InvoiceInformation;
};