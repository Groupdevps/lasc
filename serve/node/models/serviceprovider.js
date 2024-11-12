'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ServiceProvider extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ServiceProvider.belongsTo(models.Regime, {
        foreignKey: 'id'
      })
      ServiceProvider.belongsTo(models.CurrentAdministrator, {
        foreignKey: 'assignedAdministratorId',
        as: 'administrator' // Puedes cambiar 'administrator' al alias que prefieras
      });
     
      
    }
  }
  ServiceProvider.init({
    assignedAdministrator: DataTypes.STRING,
    assignedAdministratorId: DataTypes.INTEGER,
    regime: DataTypes.INTEGER,
    PersonId: DataTypes.INTEGER,
    socioeconomiclevel: DataTypes.INTEGER,
    moderatorFee : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ServiceProvider',
  });
  return ServiceProvider;
};