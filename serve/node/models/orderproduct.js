'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderProduct.belongsTo(models.Order, { foreignKey: 'OrderId' });
      OrderProduct.belongsTo(models.Product, { foreignKey: 'ProductId' });

      OrderProduct.belongsTo(models.Status, { foreignKey: 'StatusId' });



    }
  }
  OrderProduct.init({
    OrderId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    StatusId: DataTypes.INTEGER,
    cant: DataTypes.INTEGER,
    pendingCant: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderProduct',
  });
  return OrderProduct;
};