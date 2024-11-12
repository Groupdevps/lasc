'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderManualTariff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Asociación con el modelo Order
      OrderManualTariff.belongsTo(models.Order, { foreignKey: 'OrderId' });

      // Asociación con el modelo TariffManual
      OrderManualTariff.belongsTo(models.TariffManual, { foreignKey: 'TariffManualId' });
      OrderManualTariff.belongsTo(models.Status, { foreignKey: 'StatusId' });

    }
  }
  OrderManualTariff.init({
    OrderId: DataTypes.INTEGER,
    TariffManualId: DataTypes.INTEGER,
    StatusId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderManualTariff',
  });
  return OrderManualTariff;
};