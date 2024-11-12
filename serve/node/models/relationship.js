'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Relationship extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      models.TypeRelationship.hasMany(Relationship);
      Relationship.belongsTo(models.TypeRelationship);
      
      
    }
  }  Relationship.init({
    patient: DataTypes.BIGINT,
    companion: DataTypes.BIGINT,
    PatientId: DataTypes.INTEGER,
    PersonId: DataTypes.INTEGER, //id companion
    TypeRelationshipId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Relationship',
  });
  return Relationship;
};