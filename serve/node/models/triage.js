'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Triage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      
      models.User.hasOne(Triage );
      Triage.belongsTo(models.User);

      models.Attention.hasOne(Triage );
      Triage.belongsTo(models.Attention);

      

      models.HistoryPerson.hasOne(Triage );
      Triage.belongsTo(models.HistoryPerson);

      models.HistoryInfoMedicPerson.hasOne(Triage );
      Triage.belongsTo(models.HistoryInfoMedicPerson);

      Triage.belongsTo(models.LevelTriage, { foreignKey: 'LevelTriageId', as: 'LevelTriage' });


      
    }
  }
  Triage.init({
     //info person (historic table)
    HistoryPersonId: DataTypes.INTEGER,

    //info triage
    
    AttentionId: DataTypes.INTEGER,  //relationships
    UserId: DataTypes.INTEGER,  //relationships
    userPosition: DataTypes.STRING,
    LevelTriageId: DataTypes.INTEGER, //relationships
    assignedAdministrator: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    time: DataTypes.TIME,
    
    //infomedic
    HistoryInfoMedicPersonId: DataTypes.INTEGER

    
    
  }, {
    sequelize,
    modelName: 'Triage',
  });
  return Triage;
};