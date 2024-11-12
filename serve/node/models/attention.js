'use strict';
const {
  Model
} = require('sequelize');
const TypeService = require('./typeservice');
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  class Attention extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Center.hasMany(Attention);
      Attention.belongsTo(models.Center);

      Attention.hasOne(models.CAU)
      models.CAU.belongsTo(Attention);

      models.TypeService.hasMany(Attention);
      Attention.belongsTo(models.TypeService);
      
      models.Person.hasMany(Attention);
      Attention.belongsTo(models.Person);

      models.Status.hasMany(Attention);
      Attention.belongsTo(models.Status);

      models.User.hasMany(Attention );
      Attention.belongsTo(models.User, { as: 'Doctor'});

      models.User.hasMany(Attention );
      Attention.belongsTo(models.User);

      models.HistoryPerson.hasOne(Attention );
      Attention.belongsTo(models.HistoryPerson);
      
      models.Center.hasMany(Attention);
      Attention.belongsTo(models.Center);

      // Modelo Attention
      Attention.hasMany(models.Order, { foreignKey: 'AttentionId', as: 'Orders' });
      Attention.belongsTo(models.Triage, { foreignKey: 'TriageId', as: 'Triage' });
      // En el modelo Attention
      Attention.hasMany(models.Supply, { foreignKey: 'AttentionId' });

    }
  }
  Attention.init({
    attentionCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    authorizationCode: DataTypes.STRING,
    assignedDate: DataTypes.DATEONLY,    
    hour: DataTypes.TIME,
    egressDate: DataTypes.DATE,
    patient: DataTypes.BIGINT,
    companion: DataTypes.BIGINT,
    Active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    HistoryPersonId: DataTypes.INTEGER,
    TypeServiceId: DataTypes.INTEGER,
    PersonId: DataTypes.INTEGER,
    CenterId: DataTypes.INTEGER,
    StatusId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    DoctorId: DataTypes.INTEGER,
    TriageId: DataTypes.INTEGER,
    ReEntry: DataTypes.INTEGER, //(AttentionId id de la atencion principal)
    nursingDischarge: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  }, {
    sequelize,
    modelName: 'Attention',
   
    
  });
  return Attention;
};