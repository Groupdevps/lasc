'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NoteType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // NoteType.hasMany(models.NoteByAttention, { foreignKey: 'NoteTypeId' });
      // NoteType.hasMany(models.NoteByOrder, { foreignKey: 'NoteTypeId' });
      NoteType.hasMany(models.Note, { foreignKey: 'NoteTypeId' });
    }
  }
  NoteType.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'NoteType',
  });
  return NoteType;
};