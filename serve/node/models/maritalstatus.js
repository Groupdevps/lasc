'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MaritalStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      MaritalStatus.hasMany(models.Person);
      models.Person.belongsTo(MaritalStatus);
    }
  }
  MaritalStatus.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MaritalStatus',
  });
  return MaritalStatus;
};