'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PersonalBackground extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.EmergencyMedicalHistory.hasMany(PersonalBackground);
      PersonalBackground.belongsTo(models.EmergencyMedicalHistory);
    }
  }
  PersonalBackground.init({
    antecedent: DataTypes.STRING,
    description: DataTypes.STRING,
    //relation
    EmergencyMedicalHistoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PersonalBackground',
  });
  return PersonalBackground;
};