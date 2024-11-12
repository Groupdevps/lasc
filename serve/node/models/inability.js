'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inability extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Order.hasMany(Inability, { foreignKey: 'OrderId' });

      Inability.belongsTo(models.Order, { foreignKey: 'OrderId' });
    }
  }
  Inability.init({

    //fecha inicio incapacidad
    startDate: DataTypes.DATE,
    //fecha final incapacidad
    endDate: DataTypes.DATE, 
    //cantidad de dias
    disabilityDays: DataTypes.INTEGER,
    //notas u observacion de medico
    observation: DataTypes.TEXT,
    //Atencion asociada
    OrderId: DataTypes.INTEGER
    
  }, {
    sequelize,
    modelName: 'Inability',
  });
  return Inability;
};