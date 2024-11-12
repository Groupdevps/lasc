'use strict';
const {
  Model
} = require('sequelize');
const Person = require('./person')
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `modes/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     /* Address.belongsTo(models.Person, {
        foreignKey: 'numberId'
      })*/
        Address.belongsTo(models.Center, { foreignKey: 'CenterId' });
        Address.belongsTo(models.City, { foreignKey: 'CityId' });
        Address.belongsTo(models.District, { foreignKey: 'DistrictId' });
        Address.belongsTo(models.State, { foreignKey: 'StateId' });
        Address.belongsTo(models.Zone, { foreignKey: 'zone' });

        Address.belongsTo(models.CurrentAdministrator, {
          foreignKey: 'administrator',
          targetKey: 'nit',  
        });
      
    }
  }
  Address.init({
    address: DataTypes.STRING,
    zone: DataTypes.INTEGER,
    DistrictId: DataTypes.INTEGER,
    PersonId: DataTypes.INTEGER,
    CenterId: DataTypes.INTEGER,
    CityId: DataTypes.INTEGER,
    StateId: DataTypes.INTEGER ,
    administrator: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};