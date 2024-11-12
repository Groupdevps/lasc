'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderCupsList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Asociación con el modelo Order
      OrderCupsList.belongsTo(models.Order, { foreignKey: 'OrderId' });

      // Asociación con el modelo CupsList
      OrderCupsList.belongsTo(models.CupsList, { foreignKey: 'CupsListId' });
      OrderCupsList.belongsTo(models.Status, { foreignKey: 'StatusId' });

    }
  }
  OrderCupsList.init({
    OrderId: DataTypes.INTEGER,
    CupsListId: DataTypes.INTEGER,
    StatusId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderCupsList',
  });
  return OrderCupsList;
};