'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.RoomType.hasMany(Room, { foreignKey: 'RoomTypeId' });
      Room.belongsTo(models.RoomType, { foreignKey: 'RoomTypeId' });

      models.Area.hasMany(Room, { foreignKey: 'AreaId' });
      Room.belongsTo(models.Area, { foreignKey: 'AreaId' });


    }
  }
  Room.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    RoomTypeId: DataTypes.INTEGER,
    AreaId: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};