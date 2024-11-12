'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SurgeryLiquidation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SurgeryLiquidation.hasMany(models.LiquidationType, { foreignKey: 'SurgeryLiquidationId'});
      SurgeryLiquidation.belongsTo(models.User, { foreignKey: 'UserId'});
    }
  }
  SurgeryLiquidation.init({
    name: DataTypes.STRING,
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SurgeryLiquidation',
  });
  return SurgeryLiquidation;
};