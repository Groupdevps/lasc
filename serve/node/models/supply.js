'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Supply extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Supply.belongsTo(models.Attention, { foreignKey: 'AttentionId' });

    }
  }
  Supply.init({ //aplicacion de suministro
    hospitalization: DataTypes.STRING,
    accountCut: DataTypes.INTEGER,
    departureDate: DataTypes.DATEONLY,
    IdxIncome : DataTypes.STRING,
    IdxEgress : DataTypes.STRING,
    RelatedIdx : DataTypes.STRING,
    diagnoses: DataTypes.TEXT,
    whoSuppliedIt: DataTypes.STRING,
    timeSupply: DataTypes.STRING,
    supplyDate: DataTypes.DATEONLY,
    medicineSupplied: DataTypes.TEXT,
    //los datos que actualmente se estan usando son:
    AttentionId: DataTypes.INTEGER, //el numero de la atencion del servicio
    UserId: DataTypes.INTEGER, //usuario que ingreso la aplicacion (se espera que sea tambien quien aplico el suministro)
    date: DataTypes.DATEONLY, //fecha de aplicacion
    hour: DataTypes.TIME, //hora de la aplicacion
    observation: DataTypes.TEXT, //observaciones o notas
    whoAppliesIt: DataTypes.STRING, //quien realizo la aplicacion (se supone que debe ser el mismo usuario)
    whoSuppliedIt: DataTypes.STRING,//quien suministro

  }, {
    sequelize,
    modelName: 'Supply',
  });
  return Supply;
};