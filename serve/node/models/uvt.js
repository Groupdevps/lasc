'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class uvt extends Model {
    static async getLatestActiveUvt() {
      return this.findOne({
        where: {
          active: true,
          year: new Date().getFullYear().toString()
        },
        order: [['createdAt', 'DESC']]
      });
    }
    static associate(models) {
      // define association here
    }
  }
  uvt.init({
    value: DataTypes.INTEGER,
    year: DataTypes.STRING,
    active: {
      type : DataTypes.BOOLEAN,
      defaultValue:true
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'uvt',
  });
  return uvt;
};