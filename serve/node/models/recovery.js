'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recovery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // One-to-Many association with RecoveryObservation
      Recovery.hasMany(models.RecoveryObservation, {
        foreignKey: 'RecoveryId',
        as: 'RecoveryObservations',
      });

      // Many-to-One association with Person
      Recovery.belongsTo(models.Person, {
        foreignKey: 'PersonId'
      });

      // Many-to-One association with Qx
      Recovery.belongsTo(models.Qx, {
        foreignKey: 'QxId'
      });

      // Many-to-One association with Order
      Recovery.belongsTo(models.Order, {
        foreignKey: 'OrderId'
      });

      // Many-to-One association with User
      Recovery.belongsTo(models.User, {
        foreignKey: 'UserId'
      });
    }
  }
  Recovery.init({
    PersonId: DataTypes.INTEGER,
    OrderId: DataTypes.INTEGER,
    QxId: DataTypes.INTEGER,
    startDate: DataTypes.DATEONLY,
    startTime: DataTypes.TIME,

    endDate: DataTypes.DATEONLY,
    endTime: DataTypes.TIME,
    status: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Recovery',
  });
  return Recovery;
};