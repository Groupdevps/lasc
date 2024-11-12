'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderSubDiagnose extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Asociación con el modelo Order
      OrderSubDiagnose.belongsTo(models.Order, { foreignKey: 'OrderId' });

      // Asociación con el modelo SubDiagnose
      OrderSubDiagnose.belongsTo(models.SubDiagnose, { foreignKey: 'SubDiagnoseId' });
    }
  }
  OrderSubDiagnose.init({
    OrderId: DataTypes.INTEGER,
    SubDiagnoseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderSubDiagnose',
  });
  return OrderSubDiagnose;
};