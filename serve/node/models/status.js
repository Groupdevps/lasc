'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Status.hasMany(models.Order, { foreignKey: 'StatusId'});
      Status.hasMany(models.OrderManualTariff, { foreignKey: 'StatusId'})
      Status.hasMany(models.Medicine, { foreignKey: 'StatusId'})
      Status.hasMany(models.OrderProduct, { foreignKey: 'StatusId'})
      Status.hasMany(models.OrderCupsList, { foreignKey: 'StatusId'})

    }
  }
  Status.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Status',
  });
  return Status;
};
//d185f4ead788a53fbb171aa106a14f64e56af5d0