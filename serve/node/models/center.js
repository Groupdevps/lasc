'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Center extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here    
      Center.belongsTo(models.CurrentAdministrator, { foreignKey: 'CurrentAdministratorId' });
      Center.belongsTo(models.TypeCenter, { foreignKey: 'TypeCenterId' });
      Center.hasOne(models.Address, { foreignKey: 'CenterId' });
      Center.hasMany(models.Order, { foreignKey: 'CenterId' });
      Center.hasOne(models.DigitalSignature, { foreignKey: 'UserId', sourceKey: 'UserId' });
      Center.hasMany(models.ElectronicBillingAuthorization, { foreignKey: 'CenterId'});
      Center.hasMany(models.Bill, { foreignKey: 'CenterId'});
    }
  }
  Center.init({
    logoBase64: DataTypes.STRING,
    name: DataTypes.STRING,
    nit: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    description: DataTypes.STRING,
    TypeCenterId: DataTypes.INTEGER,
    CurrentAdministratorId: DataTypes.INTEGER,
    Manager:DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    slogan: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Center',
  });
  return Center;
};