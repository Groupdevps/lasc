'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HistoryPerson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Person.hasMany(HistoryPerson , {foreignKey: 'CompanionId'});
      HistoryPerson.belongsTo(models.Person, { as: 'Companion', foreignKey: 'numberId'});

      models.Person.hasMany(HistoryPerson, {
        foreignKey: 'numberId'
      } );
      HistoryPerson.belongsTo(models.Person, {
        foreignKey: 'numberId'
      } );

      models.TypeID.hasOne(HistoryPerson );
      HistoryPerson.belongsTo(models.TypeID);

      models.Gender.hasOne(HistoryPerson );
      HistoryPerson.belongsTo(models.Gender);

      HistoryPerson.belongsTo(models.CurrentAdministrator, {
        foreignKey: 'currentAdministratorNit', // Se usará este campo como clave foránea
        targetKey: 'nit', // Este es el campo en CurrentAdministrator con el que se relaciona
        as: 'administrator' // Alias para esta relación
      });
    }S
  }
  HistoryPerson.init({
     //info person (historic table)
     age: {
      type: DataTypes.VIRTUAL,
      get() {
        if (!this.birthDate) return null; // Si no hay fecha de nacimiento, retorna null

        const birthDate = new Date(this.birthDate);
        const today = new Date();
        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();

        if (months < 0) {
          years--;
          months += 12;
        }

        // Si tiene menos de un año, solo retornar los meses
        return years > 0 ? `${years} años ${months} meses` : `${months} meses`;
      },
      set(value) {
        throw new Error('Do not try to set the `age` value!');
      }
    },

     name: DataTypes.STRING,
     secondName : DataTypes.STRING,
     lastName: DataTypes.STRING,
     secondSurname:DataTypes.STRING,
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
    
     numberId: DataTypes.STRING,  //relationships
     TypeIDId: DataTypes.INTEGER, //relationships
     birthDate: DataTypes.STRING,

     
     MaritalStatusId: DataTypes.INTEGER,
     MaritalStatusString : DataTypes.STRING, 
     GenderId: DataTypes.INTEGER, //relationships

     phone: DataTypes.STRING,
     cellphone: DataTypes.STRING,
     email: DataTypes.STRING,
     
     //address
     address: DataTypes.STRING,
     city : DataTypes.STRING,
     state    : DataTypes.STRING,
     zone      : DataTypes.STRING,   
     district  : DataTypes.STRING, 

     occupation : DataTypes.STRING, 

     //acompañante
     CompanionId: DataTypes.BIGINT, //relationships
     companionName: DataTypes.STRING,
     TypeRelationshipName : DataTypes.STRING,

     //center info
     currentAdministratorNit: DataTypes.STRING,
     currentAdministratorName: DataTypes.STRING,
     regime:  DataTypes.STRING,


     membership: DataTypes.STRING,
     //other info
     TriageLevel:  DataTypes.STRING,
     //relation
    
    
    
     
  }, {
    sequelize,
    modelName: 'HistoryPerson',
  });
  return HistoryPerson;
};