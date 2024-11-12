'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SurgicalAccessRoutes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SurgicalAccessRoutes.belongsTo(models.SurgeryScheduling, { foreignKey: 'SurgerySchedulingId' ,  as: 'accessRoutes'});
      SurgicalAccessRoutes.belongsTo(models.OrderCupsList, { foreignKey: 'OrderCupsListId' });
      

      

    }
  }
  SurgicalAccessRoutes.init({
    SurgerySchedulingId: DataTypes.INTEGER,
    OrderCupsListId: DataTypes.INTEGER,
    accessRoute: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SurgicalAccessRoutes',
  });
  return SurgicalAccessRoutes;
};