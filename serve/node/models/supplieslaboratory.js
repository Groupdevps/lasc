'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SuppliesLaboratory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association her
      models.Supply.hasMany(SuppliesLaboratory);
      SuppliesLaboratory.belongsTo(models.Supply);

      //one to many User
      models.User.hasMany(SuppliesLaboratory);
      SuppliesLaboratory.belongsTo(models.User);
    }
  }
  SuppliesLaboratory.init({
    date: DataTypes.DATEONLY,
    hour: DataTypes.TIME,
    laboratory: DataTypes.TEXT,
    UserId: DataTypes.INTEGER,
    SupplyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SuppliesLaboratory',
  });
  return SuppliesLaboratory;
};