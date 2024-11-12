'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SurgeryOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Attention.hasMany(SurgeryOrder, { foreignKey: 'AttentionId' });
      models.Person.hasMany(SurgeryOrder, { foreignKey: 'PersonId' });
      models.Center.hasMany(SurgeryOrder, { foreignKey: 'CenterId' });
      models.User.hasMany(SurgeryOrder, { foreignKey: 'DoctorId' });

      SurgeryOrder.belongsTo(models.Attention, { foreignKey: 'AttentionId' });
      SurgeryOrder.belongsTo(models.Person, { foreignKey: 'PersonId' });
      SurgeryOrder.belongsTo(models.Center, { foreignKey: 'CenterId' });
      SurgeryOrder.belongsTo(models.User, { foreignKey: 'DoctorId', as: 'Doctor'});
    }
  }
  SurgeryOrder.init({
    AttentionId: DataTypes.INTEGER,
    PersonId: DataTypes.INTEGER,
    CenterId: DataTypes.INTEGER,
    DoctorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SurgeryOrder',
  });
  return SurgeryOrder;
};