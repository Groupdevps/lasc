'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SurgeryOrderSubDiagnose extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SurgeryOrderSubDiagnose.belongsTo(models.SurgeryOrder, { foreignKey: 'SurgeryOrderId' });
      SurgeryOrderSubDiagnose.belongsTo(models.SubDiagnoseList, { foreignKey: 'SubDiagnoseId' });
      models.SurgeryOrder.hasMany(SurgeryOrderSubDiagnose, { foreignKey: 'SurgeryOrderId' });
      models.SubDiagnoseList.hasMany(SurgeryOrderSubDiagnose, { foreignKey: 'SubDiagnoseId' });
    }
  }
  SurgeryOrderSubDiagnose.init({
    SurgeryOrderId: DataTypes.INTEGER,
    SubDiagnoseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SurgeryOrderSubDiagnose',
  });
  return SurgeryOrderSubDiagnose;
};