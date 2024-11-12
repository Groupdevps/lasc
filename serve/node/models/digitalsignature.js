'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DigitalSignature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DigitalSignature.hasMany(models.Bill, { foreignKey: 'DigitalSignatureId' });
      DigitalSignature.belongsTo(models.User, { foreignKey: 'UserId' });
    }
  }
  DigitalSignature.init({
    UserId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    filePath: DataTypes.STRING,
    imageUrl: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'DigitalSignature',
  });
  return DigitalSignature;
};