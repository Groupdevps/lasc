'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MedicationList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MedicationList.hasMany(models.Medicine, { foreignKey: 'MedicationListId' });

    }
  }
  MedicationList.init({
    atcCode: DataTypes.STRING,
    description: DataTypes.TEXT,
    activePrinciple: DataTypes.STRING,
    concentration: DataTypes.STRING,
    pharmaceuticalForm: DataTypes.TEXT,
    clarification: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'MedicationList',
  });
  return MedicationList;
};