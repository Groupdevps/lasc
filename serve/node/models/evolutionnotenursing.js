'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EvolutionNoteNursing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //one to many User
      models.User.hasMany(EvolutionNoteNursing);
      EvolutionNoteNursing.belongsTo(models.User);
    }
  }
  EvolutionNoteNursing.init({ //futura eliminacion reemplazado por noteByAttention
    
    AttentionId: DataTypes.INTEGER,
    observation: DataTypes.TEXT,
    UserId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    hour: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'EvolutionNoteNursing',
  });
  return EvolutionNoteNursing;
};