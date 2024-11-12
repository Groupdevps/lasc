'use strict';
const {
  Model, FLOAT
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User, {
        foreignKey: 'UserId',
        as: 'User', // Alias que usas en el include
      });
      Product.belongsTo(models.ProductType, { as: 'ProductType' });


    }
  }
  Product.init({
    
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    isActive:  {
      type:DataTypes.BOOLEAN,
      defaultValue: true
    },
    units: {
      type:DataTypes.INTEGER,
      defaultValue: 1
    },
    stock: {
      type:DataTypes.INTEGER,
      defaultValue: 0
    }, //cantidad en stock de ese producto
    description: DataTypes.STRING,
    atc: DataTypes.STRING,
    cum: DataTypes.STRING,
    invima: DataTypes.STRING,
    ProductTypeId: DataTypes.INTEGER,
    unitValue: {
      type:DataTypes.FLOAT,
      defaultValue: 0
    },
    productValue: {
      type:DataTypes.FLOAT,
      defaultValue: 0
    },
    UserId: DataTypes.INTEGER
    
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};