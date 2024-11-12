'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class District extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      District.hasMany(models.Address, { foreignKey: 'DistrictId' });


      District.belongsTo(models.City, { foreignKey: 'CityId' });
    }
  }
  District.init({
    name: DataTypes.STRING,
    CityId: DataTypes.INTEGER,
    active:{
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    Code_city: DataTypes.STRING // Agregar el campo

  }, {
    sequelize,
    modelName: 'District',
  });
  return District;
};