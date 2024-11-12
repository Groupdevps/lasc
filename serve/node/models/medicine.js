'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Medicine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     
      Medicine.belongsTo(models.MedicationList, { foreignKey: 'MedicationListId' });
      Medicine.belongsTo(models.Status, { foreignKey: 'StatusId' });
      Medicine.belongsTo(models.Order, { foreignKey: 'OrderId' });






    }
  }
  Medicine.init({
    OrderId: DataTypes.INTEGER,
    MedicationListId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    dosage: DataTypes.STRING,
    
    pendingCant: DataTypes.INTEGER,
    StatusId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Medicine',
  });
  return Medicine;
};