'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Apply extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      //one to many User
      Apply.belongsTo(models.User);
      Apply.hasMany(models.SubSupply);

    }
  }
  Apply.init({
    AttentionId: DataTypes.INTEGER, //el numero de la atencion del servicio
    UserId: DataTypes.INTEGER, //usuario que ingreso la aplicacion (se espera que sea tambien quien aplico el suministro)
    date: DataTypes.STRING, //fecha de aplicacion
    hour: DataTypes.STRING, //hora de la aplicacion
    observation: DataTypes.TEXT, //observaciones o notas
    whoAppliesIt: DataTypes.STRING, //quien realizo la aplicacion (se supone que debe ser el mismo usuario)
    whoSuppliedIt: DataTypes.STRING,//quien suministro
    
  }, {
    sequelize,
    modelName: 'Apply',
  });
  return Apply;
};