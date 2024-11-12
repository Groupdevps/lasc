'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class entryInventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Product.hasMany(entryInventory)
      entryInventory.belongsTo(models.Product)

      models.User.hasMany(entryInventory)
      entryInventory.belongsTo(models.User)

    }
  }
  entryInventory.init({
    date: DataTypes.DATE, //fecha
    cant: DataTypes.INTEGER, //cantidad
    ProductId: DataTypes.INTEGER, //id producto
    UserId: DataTypes.INTEGER, // user
    lte: DataTypes.STRING, //lote
    lteDate: DataTypes.DATEONLY, //fecha lote
    expirationDate: DataTypes.DATEONLY //fecha de expiracion
  }, {
    sequelize,
    modelName: 'entryInventory',
  });
  return entryInventory;
};