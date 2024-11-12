'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dispatch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Asociaciones con otros modelos
      Dispatch.belongsTo(models.Attention, { foreignKey: 'AttentionId' });
      Dispatch.belongsTo(models.Person, { foreignKey: 'PersonId' });
      Dispatch.belongsTo(models.Center, { foreignKey: 'CenterId' });
      Dispatch.belongsTo(models.User, { foreignKey: 'UserId' });
      Dispatch.belongsTo(models.TypeOrder, { foreignKey: 'OrderTypeId', as: 'DispatchType'});
      Dispatch.belongsTo(models.Status, { foreignKey: 'StatusId' });
      Dispatch.hasMany(models.DispatchDetail, { foreignKey: 'DispatchId'}); 
    }
  }
  Dispatch.init({
    AttentionId: DataTypes.INTEGER, //atencion
    PersonId: DataTypes.INTEGER, //paciente
    CenterId: DataTypes.INTEGER, //farmacia que despacha
    UserId: DataTypes.INTEGER, //usuario que despacha
    OrderId: DataTypes.INTEGER, //tipo de despacho

    OrderTypeId: DataTypes.INTEGER, //tipo de despacho
    StatusId: DataTypes.INTEGER, //estado del despacho
    orderNumber: DataTypes.STRING, // numero de orden asociada
    dispatchNumber: DataTypes.STRING, //numero dispatch
    DeliveredTo:DataTypes.STRING //a quien le dieron los productos

  }, {
    sequelize,
    modelName: 'Dispatch',
    hooks: {
      beforeCreate: async (dispatch, options) => {
        console.log('beforeCreate hook called');

        const lastDispatch = await Dispatch.findOne({
          dispatch: [['createdAt', 'DESC']],
          attributes: ['dispatchNumber']
        });

        if (lastDispatch && lastDispatch.dispatchNumber) {
          const lastNumber = parseInt(lastDispatch.dispatchNumber, 10);
          const nextNumber = lastNumber + 1;
          dispatch.dispatchNumber = nextNumber.toString().padStart(9, '0');
        } else {
          dispatch.dispatchNumber = '000000001';
        }

        console.log(`Generated dispatchNumber: ${dispatch.dispatchNumber}`);
      }
    }
  });
  return Dispatch;
};