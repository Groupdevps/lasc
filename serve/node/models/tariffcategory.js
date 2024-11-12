'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TariffCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // models.TariffManual.hasOne(TariffCategory);
      // TariffCategory.belongsTo(models.TariffManual);
    }
  }
  TariffCategory.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TariffCategory',
  });
  return TariffCategory;
};