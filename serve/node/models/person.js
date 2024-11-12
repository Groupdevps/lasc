
'use strict';
const {
  Model, INTEGER
} = require('sequelize');
const address = require('./address');
const relationship = require('./relationship');
const Typeid = require('./typeid');
module.exports = (sequelize, DataTypes) => {
  class Person extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Person.hasOne(models.Address)
      models.Address.belongsTo(Person);

      Person.hasOne(models.ServiceProvider)
      models.ServiceProvider.belongsTo(Person);
      
      Person.hasMany(models.Relationship);
      models.Relationship.belongsTo(Person);



      Person.hasMany(models.Order);
    
      
    }
  }
  Person.init({
    name: DataTypes.STRING,
    secondName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    secondSurname: DataTypes.STRING,
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        // Verificar si cada campo es `undefined` o `null` y asignar una cadena vacía si es así
        const name = this.name || "";
        const secondName = this.secondName || "";
        const lastName = this.lastName || "";
        const secondSurname = this.secondSurname || "";
    
        return `${name} ${secondName} ${lastName} ${secondSurname}`.trim(); // `trim()` elimina los espacios en blanco extra
      },
      set(value) {
        throw new Error('Do not try to set the `fullName` value!');
      }
    },

    numberId: DataTypes.BIGINT,
    TypeIDId: DataTypes.INTEGER,
    birthDate: DataTypes.DATEONLY ,

    
    GenderId: DataTypes.INTEGER,
    MaritalStatusId: DataTypes.INTEGER,
    
    phone: DataTypes.STRING,
    cellphone: DataTypes.STRING,
    email: DataTypes.STRING,
    
    occupation: DataTypes.STRING,
    Adult: DataTypes.BOOLEAN
        

  }, {
    sequelize,
    modelName: 'Person',
  });
  return Person;
};