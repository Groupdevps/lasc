'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Observation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.ClinicHistory.hasMany(Observation);
      Observation.belongsTo(models.ClinicHistory);
    }
  }
  Observation.init({ //futura eliminacion reemplazado por noteByAttention
    observation: DataTypes.TEXT,
    ClinicHistoryId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Observation',
  });
  return Observation;
};