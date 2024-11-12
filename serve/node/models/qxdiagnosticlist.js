'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QxDiagnosticList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Asociar QxDiagnosticList con DiagnosticList
      QxDiagnosticList.belongsTo(models.DiagnosticList, { foreignKey: 'DiagnosticListId' });
      
      // Asociar QxDiagnosticList con Qx
      QxDiagnosticList.belongsTo(models.Qx, { foreignKey: 'QxId' });
    }
  }
  QxDiagnosticList.init({
    DiagnosticListId: DataTypes.INTEGER,
    QxId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'QxDiagnosticList',
  });
  return QxDiagnosticList;
};