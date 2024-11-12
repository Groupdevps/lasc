'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderLab extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Attention.hasOne(OrderLab);
      OrderLab.belongsTo(models.Attention);
      
    }
  }
  OrderLab.init({
    //relation
    CupsListId: DataTypes.INTEGER,


    numberId: DataTypes.BIGINT,
    AttentionId: DataTypes.INTEGER,
    date: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderLab',
  });
  return OrderLab;
};