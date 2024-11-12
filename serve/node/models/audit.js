'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Audit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Audit.init({
    numberAttention: DataTypes.BIGINT,
    userId: DataTypes.INTEGER,
    messageId: DataTypes.INTEGER,
    observation: DataTypes.TEXT,
    state: DataTypes.INTEGER,
    form: DataTypes.STRING,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Audit',
  });
  return Audit;
};