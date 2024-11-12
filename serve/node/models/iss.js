'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class iss extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  iss.init({
    ref: DataTypes.STRING,
    code: DataTypes.STRING,
    description: DataTypes.TEXT,
    uvr: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'iss',
  });
  return iss;
};