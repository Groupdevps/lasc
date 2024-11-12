'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QxCode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //one to many supply
      models.Supply.hasMany(QxCode);
      QxCode.belongsTo(models.Supply);

      //one to many User
      models.User.hasMany(QxCode);
      QxCode.belongsTo(models.User);
    }
  }
  QxCode.init({
    date: DataTypes.DATEONLY,
    hour: DataTypes.TIME,
    qx: DataTypes.STRING,
    code: DataTypes.STRING,
    comment: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    SupplyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'QxCode',
  });
  return QxCode;
};