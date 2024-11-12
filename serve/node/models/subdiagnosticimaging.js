'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubDiagnosticImaging extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //one to many supply
      models.Supply.hasMany(SubDiagnosticImaging);
      SubDiagnosticImaging.belongsTo(models.Supply);

      //one to many User
      models.User.hasMany(SubDiagnosticImaging);
      SubDiagnosticImaging.belongsTo(models.User);
    }
  }
  SubDiagnosticImaging.init({
    date: DataTypes.DATEONLY,
    hour: DataTypes.TIME,
    description: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    SupplyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SubDiagnosticImaging',
  });
  return SubDiagnosticImaging;
};