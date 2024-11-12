'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QxCupsList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      QxCupsList.belongsTo(models.CupsList, { foreignKey: 'CupsListId' });
      
      // Asociar QxCupsList con Qx
      QxCupsList.belongsTo(models.Qx, { foreignKey: 'QxId' });
    }
  }
  QxCupsList.init({
    CupsListId: DataTypes.INTEGER,
    QxId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'QxCupsList',
  });
  return QxCupsList;
};