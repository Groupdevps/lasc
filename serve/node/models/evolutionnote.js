'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EvolutionNote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //one to many User
      models.User.hasMany(EvolutionNote);
      EvolutionNote.belongsTo(models.User);
    }
  }
  EvolutionNote.init({ //futura eliminacion reemplazado por noteByAttention
    //Relation
    AttentionId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    observation: DataTypes.TEXT,
    //diagnosis: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    hour: DataTypes.TIME,
    
  }, {
    sequelize,
    modelName: 'EvolutionNote',
  });
  return EvolutionNote;
};