'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CupsList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       //one to many orden Order

      //one to many orden OrderLab
      CupsList.hasMany(models.OrderLab);
      models.OrderLab.belongsTo(CupsList);

      CupsList.hasMany(models.OrderCupsList, { foreignKey: 'CupsListId' });

      
    }
  }
  CupsList.init({
    code: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'CupsList',
  });
  return CupsList;
};