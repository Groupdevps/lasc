'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MedicalOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MedicalOrder.init({
    HistoryPersonId: DataTypes.INTEGER,
    AttentionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MedicalOrder',
  });
  return MedicalOrder;
};