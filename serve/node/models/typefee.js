'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TypeFee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TypeFee.hasMany(models.ServiceFee, {
        foreignKey: 'typeFee'
      })
    }
  }
  TypeFee.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TypeFee',
  });
  return TypeFee;
};