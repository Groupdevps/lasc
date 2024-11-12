'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SurgeryScheduling extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SurgeryScheduling.hasMany(models.SurgicalAccessRoutes, { foreignKey: 'SurgerySchedulingId' , as: 'accessRoutes' });

    }
  }
  SurgeryScheduling.init({
    OrderId: DataTypes.INTEGER,
    Date: DataTypes.DATE,
    Hour: DataTypes.TIME,
    SurgeonA: DataTypes.INTEGER,
    SurgeonB: DataTypes.INTEGER,
    SurgeryLiquidationId: DataTypes.INTEGER,
    /* cancelled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    } */
  }, {
    sequelize,
    modelName: 'SurgeryScheduling',
  });
  return SurgeryScheduling;
};