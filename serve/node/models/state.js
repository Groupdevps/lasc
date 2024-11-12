'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class State extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      State.belongsTo(models.Address, {
        foreignKey: 'id'
      })
      State.hasMany(models.Address, { foreignKey: 'StateId' });

    }
  }
  State.init({
    code: DataTypes.STRING,
    name: DataTypes.STRING
    
  }, {
    sequelize,
    modelName: 'State',
    tableName: 'States',
  });
  return State;
};