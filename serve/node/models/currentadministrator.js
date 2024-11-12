'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CurrentAdministrator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CurrentAdministrator.hasMany(models.ServiceProvider, {
        foreignKey: 'assignedAdministratorId',
        as: 'providers' // Puedes cambiar 'providers' al alias que prefieras
      });
      CurrentAdministrator.belongsTo(models.Regime)
      
      
      // Si quieres la relación inversa, puedes definirla aquí
      CurrentAdministrator.hasMany(models.HistoryPerson, {
        foreignKey: 'currentAdministratorNit',
        sourceKey: 'nit', // Asegura que usemos el campo 'nit' en CurrentAdministrator
        as: 'people' // Alias opcional para la relación inversa
      });

      CurrentAdministrator.hasOne(models.Address, {
        foreignKey: 'administrator',
        sourceKey: 'nit',  // La clave `nit` es la clave de la relación en `CurrentAdministrator`
      });
    }
  }
  CurrentAdministrator.init({
    nit: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    description: DataTypes.STRING,
    TypeCenterId : DataTypes.INTEGER,
    code          : DataTypes.STRING,
    mobilityCode  : DataTypes.STRING,
    regime        : DataTypes.STRING,
    RegimeId : DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'CurrentAdministrator',
  });
  return CurrentAdministrator;
};