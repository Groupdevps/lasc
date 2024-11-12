'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class diagnosticAidResult extends Model {
    static associate(models) {
      models.Attention.hasMany(diagnosticAidResult);
      diagnosticAidResult.belongsTo(models.Attention);

      models.Order.hasMany(diagnosticAidResult);
      diagnosticAidResult.belongsTo(models.Order);

      models.User.hasMany(diagnosticAidResult);
      diagnosticAidResult.belongsTo(models.User);
    }
  }

  diagnosticAidResult.init({
    AttentionId: DataTypes.INTEGER,
    PersonId: DataTypes.INTEGER,
    OrderId: DataTypes.INTEGER, // Cambiado de OrdenId a OrderId
    cup: DataTypes.STRING,
    report: DataTypes.TEXT,
    conclusion: DataTypes.TEXT,
    note: DataTypes.TEXT,
    UserId: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'diagnosticAidResult',
  });

  return diagnosticAidResult;
};
