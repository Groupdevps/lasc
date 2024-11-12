'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SuppliesOtherService extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       //one to many supply
       models.Supply.hasMany(SuppliesOtherService);
       SuppliesOtherService.belongsTo(models.Supply);
 
       //one to many User
       models.User.hasMany(SuppliesOtherService);
       SuppliesOtherService.belongsTo(models.User);
    }
  }
  SuppliesOtherService.init({
    date: DataTypes.DATEONLY,
    hour: DataTypes.TIME,
    service: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    SupplyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SuppliesOtherService',
  });
  return SuppliesOtherService;
};