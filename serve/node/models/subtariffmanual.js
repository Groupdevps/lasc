'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubTariffManual extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //one to many invoice
      models.Invoice.hasMany(SubTariffManual)
      SubTariffManual.belongsTo(models.Invoice)
    }
  }
  SubTariffManual.init({
    medicine: DataTypes.STRING,
    code: DataTypes.STRING,
    price: DataTypes.FLOAT,
    amount: DataTypes.INTEGER,
    total: DataTypes.FLOAT,
    InvoiceId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SubTariffManual',
  });
  return SubTariffManual;
};