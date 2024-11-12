'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LiquidationType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      LiquidationType.belongsTo(models.SurgeryLiquidation, { foreignKey: 'SurgeryLiquidationId' });
      LiquidationType.belongsTo(models.Service, { foreignKey: 'ServiceId' });
      LiquidationType.belongsTo(models.ManualType, { foreignKey: 'ManualTypeId' });
    }
  }
  LiquidationType.init({
    SurgeryLiquidationId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    No: DataTypes.INTEGER,
    ServiceId: DataTypes.INTEGER,
    ManualTypeId: DataTypes.INTEGER,
    percentage: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'LiquidationType',
  });
  return LiquidationType;
};