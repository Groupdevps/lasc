'use strict';
const {
  Model
} = require('sequelize');
const { Sequelize } = require('.');
module.exports = (sequelize, DataTypes) => {
  class ObservationEvolutionNote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //one to many EvolutionNote
      models.EvolutionNote.hasMany(ObservationEvolutionNote);
      ObservationEvolutionNote.belongsTo(models.EvolutionNote);

      //one to many User
      models.User.hasMany(ObservationEvolutionNote);
      ObservationEvolutionNote.belongsTo(models.User);

    }
  }
  ObservationEvolutionNote.init({ //futura eliminacion reemplazado por noteByAttention
    observation: DataTypes.TEXT,
    EvolutionNoteId: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
    hour: DataTypes.TIME,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ObservationEvolutionNote',
  });
  return ObservationEvolutionNote;
};