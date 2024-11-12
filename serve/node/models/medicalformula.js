'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MedicalFormula extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Attention.hasOne(MedicalFormula);
      MedicalFormula.belongsTo(models.Attention);
      
    }
  }
  MedicalFormula.init({
    //relation
    AttentionId: DataTypes.INTEGER,
    HistoryPersonId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    
    //info form
    date: DataTypes.DATEONLY,

    
  }, {
    sequelize,
    modelName: 'MedicalFormula',
  });
  return MedicalFormula;
};