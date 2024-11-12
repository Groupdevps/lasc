'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LaboratoryResult extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Attention.hasMany(LaboratoryResult)
      LaboratoryResult.belongsTo(models.Attention)

      models.User.hasMany(LaboratoryResult)
      LaboratoryResult.belongsTo(models.User, { as: 'Doctor', foreignKey: 'UserId' });


      models.Center.hasMany(LaboratoryResult)
      LaboratoryResult.belongsTo(models.Center)

      models.Order.hasOne(LaboratoryResult)
      LaboratoryResult.belongsTo(models.Order)

    }
  }
  LaboratoryResult.init({
    AttentionId: DataTypes.INTEGER,
    numberId: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    PersonId: DataTypes.INTEGER,
    CenterId: DataTypes.INTEGER,
    cup: DataTypes.STRING,
    OrderId: DataTypes.INTEGER,
    metodology: DataTypes.STRING,
    note: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'LaboratoryResult',
  });
  return LaboratoryResult;
};