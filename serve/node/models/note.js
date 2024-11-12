'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Note.belongsTo(models.User, { foreignKey: 'UserId' });
      Note.belongsTo(models.Attention, { foreignKey: 'AttentionId' });
      Note.belongsTo(models.Order, { foreignKey: 'OrderId' });
      Note.belongsTo(models.NoteType, { foreignKey: 'NoteTypeId' });
    }
  }
  Note.init({
    note: DataTypes.TEXT,
    UserId: DataTypes.INTEGER,
    AttentionId: DataTypes.INTEGER,
    OrderId: DataTypes.INTEGER,
    NoteTypeId: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
    time: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'Note',
  });
  return Note;
};