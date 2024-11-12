'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Qx extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Associations
      Qx.belongsTo(models.User, { foreignKey: 'surgeonId', as: 'surgeon' });
      Qx.belongsTo(models.User, { foreignKey: 'anesthesiologistId', as: 'anesthesiologist' });
      Qx.belongsTo(models.User, { foreignKey: 'instrumenterId', as: 'instrumenter' });
      Qx.belongsTo(models.User, { foreignKey: 'assistantId', as: 'assistant' });
      models.User.hasMany(Qx, { foreignKey: 'surgeonId', as: 'surgeons' });
      models.User.hasMany(Qx, { foreignKey: 'anesthesiologistId', as: 'anesthesiologists' });
      models.User.hasMany(Qx, { foreignKey: 'instrumenterId', as: 'instrumenters' });
      models.User.hasMany(Qx, { foreignKey: 'assistantId', as: 'assistants' });

      Qx.hasMany(models.QxDiagnosticList);

      Qx.hasMany(models.QxCupsList);

      Qx.belongsTo(models.User, { foreignKey: 'UserId', as: 'creator' });
      models.User.hasMany(Qx, { foreignKey: 'UserId', as: 'createdBy' });

      Qx.belongsTo(models.Attention, { foreignKey: 'AttentionId', as: 'attention' });
      models.Attention.hasMany(Qx, { foreignKey: 'AttentionId', as: 'attentions' });

      Qx.belongsTo(models.Person, { foreignKey: 'PersonId', as: 'person' });
      models.Person.hasMany(Qx, { foreignKey: 'PersonId', as: 'persons' });


    }
  }
  Qx.init({
    startDate: DataTypes.DATEONLY,
    startTime: DataTypes.TIME,

    endDate: DataTypes.DATEONLY,
    endTime: DataTypes.TIME,

    surgeonId: DataTypes.INTEGER,
    anesthesiologistId: DataTypes.INTEGER,
    instrumenterId: DataTypes.INTEGER,
    assistantId: DataTypes.INTEGER,
    AnestheticTechniqueId: DataTypes.INTEGER,
    
    description: DataTypes.TEXT,

    UserId: DataTypes.INTEGER,
    AttentionId: DataTypes.INTEGER,
    PersonId: DataTypes.INTEGER,
    OrderId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Qx',
  });
  return Qx;
};