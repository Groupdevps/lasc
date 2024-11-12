'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     /* City.belongsTo(models.Address, {
        foreignKey: 'id'
      })*/
      models.State.hasMany(City);
      City.belongsTo(models.State);

      City.hasMany(models.Address, { foreignKey: 'CityId' });
    }
  }
  City.init({
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    StateId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'City',
    tableName: 'Cities',    
  });
  return City;
};