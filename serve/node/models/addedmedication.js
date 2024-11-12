'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AddedMedication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //one to many invoice
      models.Invoice.hasMany(AddedMedication );
      AddedMedication.belongsTo(models.Invoice);
    }
  }
  AddedMedication.init({
    description: DataTypes.TEXT,
    purchaseValue: DataTypes.FLOAT,
    units: DataTypes.INTEGER,
    code: DataTypes.STRING,
    epsValue: DataTypes.FLOAT,
    hourValue: DataTypes.FLOAT,
    value30Min: DataTypes.FLOAT,
    total: DataTypes.FLOAT,
    InvoiceId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AddedMedication',
  });
  return AddedMedication;
};