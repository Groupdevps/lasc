'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ObservationNursing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //one to many EvolutionNote
      models.EvolutionNoteNursing.hasMany(ObservationNursing);
      ObservationNursing.belongsTo(models.EvolutionNoteNursing);

      //one to many User
      models.User.hasMany(ObservationNursing);
      ObservationNursing.belongsTo(models.User);
    }
  }
  ObservationNursing.init({ //futura eliminacion reemplazado por noteByAttention
    observation: DataTypes.TEXT,
    EvolutionNoteNursingId: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
    hour: DataTypes.TIME,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ObservationNursing',
  });
  return ObservationNursing;
};