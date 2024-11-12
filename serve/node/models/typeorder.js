'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TypeOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TypeOrder.hasMany(models.Order, { foreignKey: 'OrderTypeId' });

    }
  }
  TypeOrder.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TypeOrder',
  });
  return TypeOrder;
};