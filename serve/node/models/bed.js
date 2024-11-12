'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      models.Room.hasMany(Bed, { foreignKey: 'RoomId' });
      Bed.belongsTo(models.Room, { foreignKey: 'RoomId' });
    }
  }
  Bed.init({
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    RoomId: DataTypes.INTEGER,
    available: DataTypes.BOOLEAN,
    isActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Bed',
  });
  return Bed;
};