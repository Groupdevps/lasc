'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderMaterial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderMaterial.belongsTo(models.Order, { foreignKey: 'OrderId' });
      // Define la asociación con Material
      OrderMaterial.belongsTo(models.Material, { foreignKey: 'MaterialId' });
    }
  }
  OrderMaterial.init({
    OrderId: DataTypes.INTEGER,
    MaterialId: DataTypes.INTEGER,
    cant: DataTypes.INTEGER,
    note: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'OrderMaterial',
  });
  return OrderMaterial;
};