'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recommendation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Association with Attention
      Recommendation.belongsTo(models.Order, { foreignKey: 'OrderId' });
      
    }
  }
  Recommendation.init({
    OrderId: DataTypes.INTEGER,
    recommendation: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Recommendation',
  });
  return Recommendation;
};