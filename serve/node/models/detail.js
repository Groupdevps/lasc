'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Detail.belongsTo(models.DetailType, { foreignKey: 'DetailTypeId' });
    }
  }
  Detail.init( {
    UserId: {
      type: DataTypes.INTEGER, // Usuario quien crea el detalle
      allowNull: false
    },
    attentionCode: {
      type: DataTypes.STRING, // Código de atención
      allowNull: false
    },
    DetailTypeId: {
      type: DataTypes.INTEGER, // Tipo de detalle
      allowNull: false
    },
    BillId: {
      type: DataTypes.INTEGER, // id Número de factura
      allowNull: true
    },
    description: {
      type: DataTypes.STRING, // Descripción del concepto
      allowNull: false
    },
    cant: {
      type: DataTypes.INTEGER, // Cantidad acumulada
      allowNull: false
    },
    unityValue: {
      type: DataTypes.INTEGER, // Valor unitario actual
      allowNull: false
    },
    totalValue: {
      type: DataTypes.VIRTUAL, // Campo virtual para calcular el precio total
      get() {
        const quantity = this.getDataValue('cant');
        const unitPrice = this.getDataValue('unityValue');
        return quantity * unitPrice;
      }
    }
  }, {
    sequelize,
    modelName: 'Detail'
  });
  return Detail;
};