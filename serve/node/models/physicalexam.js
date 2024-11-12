'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PhysicalExam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.EmergencyMedicalHistory.hasMany(PhysicalExam);
      PhysicalExam.belongsTo(models.EmergencyMedicalHistory);
    }
  }
  PhysicalExam.init({
    examined: DataTypes.STRING,
    status: DataTypes.STRING,
    description: DataTypes.STRING,
    //relation
    EmergencyMedicalHistoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PhysicalExam',
  });
  return PhysicalExam;
};