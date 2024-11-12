'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Turn extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Turn.init({
    agendaId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    startTime: DataTypes.STRING,
    endTime: DataTypes.STRING,
    state: DataTypes.INTEGER,
    campus: DataTypes.STRING,
    stateString: DataTypes.STRING,
    personId: DataTypes.INTEGER,
    numberAttention: DataTypes.BIGINT,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Turn',
  });
  return Turn;
};