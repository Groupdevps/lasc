'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SurgeryOrderTariffManual extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SurgeryOrderTariffManual.belongsTo(models.SurgeryOrder, { foreignKey: 'SurgeryOrderId' });
      SurgeryOrderTariffManual.belongsTo(models.TariffManual, { foreignKey: 'TariffManualId' });
      models.SurgeryOrder.hasMany(SurgeryOrderTariffManual, { foreignKey: 'SurgeryOrderId' });
      models.TariffManual.hasMany(SurgeryOrderTariffManual, { foreignKey: 'TariffManualId' });
    }
  }
  SurgeryOrderTariffManual.init({
    SurgeryOrderId: DataTypes.INTEGER,
    TariffManualId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SurgeryOrderTariffManual',
  });
  return SurgeryOrderTariffManual;
};