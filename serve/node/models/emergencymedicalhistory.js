'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmergencyMedicalHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.HistoryInfoMedicPerson.hasOne(EmergencyMedicalHistory );
      EmergencyMedicalHistory.belongsTo(models.HistoryInfoMedicPerson);

      models.HistoryPerson.hasOne(EmergencyMedicalHistory );
      EmergencyMedicalHistory.belongsTo(models.HistoryPerson);

      models.User.hasMany(EmergencyMedicalHistory);
      EmergencyMedicalHistory.belongsTo(models.User);

      models.Attention.hasOne(EmergencyMedicalHistory);
      EmergencyMedicalHistory.belongsTo(models.Attention);
    }
  }
  EmergencyMedicalHistory.init({
    //relations
    numberId: DataTypes.BIGINT,
    AttentionId: DataTypes.BIGINT,
    HistoryPersonId : DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    HistoryInfoMedicPersonId: DataTypes.INTEGER,
    

    

    // info de form
    authorizationNumber: DataTypes.STRING,
    reviewBySystem: DataTypes.TEXT,
    observations: DataTypes.TEXT,
    paraclinical: DataTypes.TEXT,
    plan: DataTypes.TEXT,
    familyBackground: DataTypes.TEXT,
    //data extra
    assignedDate: DataTypes.DATEONLY,
    hour: DataTypes.TIME,
    typeAttention: DataTypes.STRING,


  }, {
    sequelize,
    modelName: 'EmergencyMedicalHistory',
  });
  return EmergencyMedicalHistory;
};