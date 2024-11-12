'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ElectronicBillingAuthorization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ElectronicBillingAuthorization.belongsTo(models.Center, { foreignKey: 'CenterId'});

      ElectronicBillingAuthorization.hasMany(models.Bill, { foreignKey: 'ElectronicBillingAuthorizationId' });

    }
  }
  ElectronicBillingAuthorization.init({
    authorizationNumber: DataTypes.STRING,
    authorizationDate: DataTypes.DATEONLY, //cambiar StartDate y agregar otra //EndDate
    from: DataTypes.INTEGER,
    to: DataTypes.INTEGER,
    prefix: DataTypes.STRING,
    initialInvoiceNumber: DataTypes.INTEGER,
    LastInvoiceNumber: DataTypes.INTEGER,

    CenterId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE'
    },
    active:{
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
    
  }, {
    sequelize,
    modelName: 'ElectronicBillingAuthorization',
  });
  return ElectronicBillingAuthorization;
};