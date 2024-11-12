'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HistoryInfoMedicPerson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Person.hasMany(HistoryInfoMedicPerson, {
        foreignKey: 'numberId'
      } );
      HistoryInfoMedicPerson.belongsTo(models.Person, {
        foreignKey: 'numberId'
      } );

    }
  }
  HistoryInfoMedicPerson.init({

    //relations

    numberId: DataTypes.STRING,

    //info medica
    motive: DataTypes.STRING,
    personalHistory: DataTypes.TEXT,
    familyBackground: DataTypes.TEXT,
    allergic: DataTypes.TEXT,
    glasgow: DataTypes.STRING,
    glucometry: DataTypes.STRING,
    temperature: DataTypes.STRING,
    fr: DataTypes.STRING,
    fc: DataTypes.STRING,
    pa1: DataTypes.STRING,
    pa: DataTypes.STRING,
    imc: DataTypes.STRING,
    isc: DataTypes.STRING,

    size: DataTypes.STRING,
    weight: DataTypes.STRING,
    pregnancy: DataTypes.BOOLEAN,
    pregnancyTime: DataTypes.STRING,
    f: DataTypes.STRING,
    u: DataTypes.STRING,
    r: DataTypes.STRING,
    tg: DataTypes.STRING,
    f1: DataTypes.STRING,
    p: DataTypes.STRING,
    p1: DataTypes.STRING,
    g: DataTypes.STRING,
    p2: DataTypes.STRING,
    a: DataTypes.STRING,
    c: DataTypes.STRING,
    cause: DataTypes.STRING,
    cytology: DataTypes.STRING,
    result: DataTypes.STRING,
    isReEntry: DataTypes.BOOLEAN,
    medicalSignature: DataTypes.STRING,
    spo2: DataTypes.STRING,
    //aditional
    paraclinical: DataTypes.TEXT,

  }, {
    sequelize,
    modelName: 'HistoryInfoMedicPerson',
  });
  return HistoryInfoMedicPerson;
};