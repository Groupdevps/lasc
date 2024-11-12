'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ServiceCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ServiceCategory.hasMany(models.TypeService);
      models.TypeService.belongsTo(ServiceCategory);

      ServiceCategory.hasOne(models.TypeService);
      models.TypeService.belongsTo(ServiceCategory);
    }
  }
  ServiceCategory.init({
    name: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    TypeServiceId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ServiceCategory',
  });
  return ServiceCategory;
};