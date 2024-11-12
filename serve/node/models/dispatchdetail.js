'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DispatchDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Asociaciones con otros modelos
      DispatchDetail.belongsTo(models.Dispatch, { foreignKey: 'DispatchId' });
      DispatchDetail.belongsTo(models.Product, { foreignKey: 'ProductId' });
      DispatchDetail.belongsTo(models.Status, { foreignKey: 'StatusId' });
      DispatchDetail.belongsTo(models.Medicine, { foreignKey: 'MedicineId' });
      DispatchDetail.belongsTo(models.OrderProduct, { foreignKey: 'OrderProductId' });
    }
  }
  DispatchDetail.init({
    DispatchId: DataTypes.INTEGER, //a que despacho pertenece
    ProductId: DataTypes.INTEGER,//que producto 
    StatusId: DataTypes.INTEGER, //estado del despacho del producto
    MedicineId: DataTypes.INTEGER,//medicamento solicitado
    OrderProductId: DataTypes.INTEGER, //producto solicitado
    cant: DataTypes.INTEGER, //cantidad,
    available: DataTypes.INTEGER,//disponible
    note: DataTypes.TEXT// notas adicionales
  }, {
    sequelize,
    modelName: 'DispatchDetail',
  });
  return DispatchDetail;
};