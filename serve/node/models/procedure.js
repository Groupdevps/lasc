'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Procedure extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Procedure.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    CupListId: DataTypes.INTEGER,
    SupplyId: DataTypes.INTEGER,
    DoctorId: DataTypes.INTEGER,
    PersonId: DataTypes.INTEGER,
    AttentionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Procedure',
  });
  return Procedure;
};