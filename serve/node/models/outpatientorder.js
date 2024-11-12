'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OutpatientOrder extends Model {
    /** orden ambulatoria
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Attention.hasOne(OutpatientOrder);
      OutpatientOrder.belongsTo(models.Attention);
    }
  }
  OutpatientOrder.init({
    //info de orden medica
    
    date: DataTypes.DATEONLY,
    
    specialty: DataTypes.STRING,
    lift: DataTypes.TEXT,
    internalMedicine: DataTypes.TEXT,



    //relaciones
    AttentionId: DataTypes.INTEGER,
    
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OutpatientOrder',
  });
  return OutpatientOrder;
};