'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DiagnosticAid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Attention.hasOne(DiagnosticAid);
      DiagnosticAid.belongsTo(models.Attention);
    }
  }
  DiagnosticAid.init({
    //relation
    AttentionId: DataTypes.INTEGER,

    //infoform
    numberId: DataTypes.BIGINT,
    date: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DiagnosticAid',
  });
  return DiagnosticAid;
};