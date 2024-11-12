'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      

      // Asociación con los modelos relacionados
      Order.belongsTo(models.Attention, {
        foreignKey: 'AttentionId', // Asegúrate de que este sea el nombre correcto del campo en tu base de datos
        as: 'Attention' // Asegúrate de usar el mismo alias en tus consultas
      });
      Order.belongsTo(models.Person, { foreignKey: 'PersonId' });
      Order.belongsTo(models.Center, { foreignKey: 'CenterId' });
      Order.belongsTo(models.User, { foreignKey: 'UserId', as: 'Doctor' });
      Order.belongsTo(models.TypeOrder, { foreignKey: 'OrderTypeId' });
      Order.belongsTo(models.Status, { foreignKey: 'StatusId' });


      // Asociaciones con detalles específicos de la orden
      
      
      Order.hasMany(models.OrderProduct, { foreignKey: 'OrderId' });
      Order.hasMany(models.OrderCupsList, { foreignKey: 'OrderId' });
      Order.hasMany(models.OrderManualTariff, { foreignKey: 'OrderId' });
      Order.hasMany(models.OrderSubDiagnose, { foreignKey: 'OrderId' });
      Order.hasMany(models.Medicine, { foreignKey: 'OrderId' });
      Order.hasMany(models.Recommendation, { foreignKey: 'OrderId' });



     
    }
  }
  Order.init({
    
    StatusId: {
      type: DataTypes.INTEGER,
    },
    //version mejorada
    AttentionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Attention',
        key: 'id'
      }
    },
    PersonId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Person',
        key: 'id'
      }
    },
    CenterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Center',
        key: 'id'
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    OrderTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TypeOrder',
        key: 'id'
      }
    },
    orderNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    orderReference: DataTypes.STRING
  },  {
    sequelize,
    modelName: 'Order',
    hooks: {
      beforeCreate: async (order, options) => {
        console.log('beforeCreate hook called');

        const lastOrder = await Order.findOne({
          order: [['createdAt', 'DESC']],
          attributes: ['orderNumber']
        });

        if (lastOrder && lastOrder.orderNumber) {
          const lastNumber = parseInt(lastOrder.orderNumber, 10);
          const nextNumber = lastNumber + 1;
          order.orderNumber = nextNumber.toString().padStart(9, '0');
        } else {
          order.orderNumber = '000000001';
        }

        console.log(`Generated orderNumber: ${order.orderNumber}`);
      }
    }
  });

  return Order;
};