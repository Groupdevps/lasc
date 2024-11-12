'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CAU extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(CAU );
      CAU.belongsTo(models.User);
    }
  }
  CAU.init({
    CAU: DataTypes.STRING,
    AttentionId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    Observation: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'CAU',
  });
  return CAU;
};