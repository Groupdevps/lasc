'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClinicHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      
      models.Attention.hasOne(ClinicHistory );
      ClinicHistory.belongsTo(models.Attention);

      models.User.hasOne(ClinicHistory );
      ClinicHistory.belongsTo(models.User);

      models.HistoryPerson.hasOne(ClinicHistory );
      ClinicHistory.belongsTo(models.HistoryPerson);

     

      
    }
  }
  ClinicHistory.init({
    //info person
    HistoryPersonId: DataTypes.INTEGER,
    
    //info clinic history
    numberId: DataTypes.BIGINT,
    AttentionId: DataTypes.INTEGER,  //relationships
    UserId: DataTypes.INTEGER,  //relationships
    assignedCenter: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    time: DataTypes.TIME,

    //info medica
    //SubDiagnoseClinicHistory: DataTypes.INTEGER,
    //ObservationClinicalHistoryId: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'ClinicHistory',
  });
  return ClinicHistory;
};