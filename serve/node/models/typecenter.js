'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TypeCenter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       TypeCenter.hasMany(models.CurrentAdministrator, {
        foreignKey: 'TypeCenterId'
      })
      models.CurrentAdministrator.belongsTo(TypeCenter, {
        foreignKey: 'TypeCenterId'
      })
      TypeCenter.hasMany(models.Center, { foreignKey: 'TypeCenterId' });
    }
  }
  TypeCenter.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TypeCenter',
  });
  return TypeCenter;
};