'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RecoveryObservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Many-to-One association with Recovery
      RecoveryObservation.belongsTo(models.Recovery, {
        foreignKey: 'RecoveryId',
        as: 'Recovery',
      });
      // Many-to-One association with User
      RecoveryObservation.belongsTo(models.User, {
        foreignKey: 'UserId'
      });
    }
  }
  RecoveryObservation.init({ //futura eliminacion reemplazado por noteByOrder
    RecoveryId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    text: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RecoveryObservation',
  });
  return RecoveryObservation;
};