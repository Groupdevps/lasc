'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AnexCups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Anex3.hasMany(AnexCups);
      AnexCups.belongsTo(models.Anex3);
    }
  }
  AnexCups.init({
    Anex3Id: DataTypes.INTEGER,
    cups: DataTypes.STRING,
    cant: DataTypes.STRING,
    description: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'AnexCups',
  });
  return AnexCups;
};