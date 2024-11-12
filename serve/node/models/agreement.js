'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Agreement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Agreement.belongsTo(models.CurrentAdministrator, {
        foreignKey: 'administrator', // NIT del Agreement
        targetKey: 'nit', // NIT del CurrentAdministrator
        as: 'currentAdministrator'
      });
    }
  }
  Agreement.init({
    numberAgreement: DataTypes.STRING,
    name: DataTypes.STRING,
    startDate: DataTypes.DATEONLY,
    finalDate: DataTypes.DATEONLY,
    administrator: DataTypes.STRING,
    percent: DataTypes.FLOAT,
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    tariffManualType: DataTypes.ENUM('ISS', 'SOAT') // Agregar el tipo de manual tarifario
  }, {
    sequelize,
    modelName: 'Agreement',
  });
  return Agreement;
};