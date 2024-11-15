'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BillPharmacy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BillPharmacy.init({
    numberAttention: DataTypes.BIGINT,
    code: DataTypes.STRING,
    description: DataTypes.STRING,
    presentation: DataTypes.STRING,
    concentration: DataTypes.TEXT,
    amount: DataTypes.INTEGER,
    value: DataTypes.FLOAT,
    total: DataTypes.FLOAT,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BillPharmacy',
  });
  return BillPharmacy;
};